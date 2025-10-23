'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import { account, tablesDB } from "../appwrite/appwrite";
import { useLocalStorage } from '../customHooks/useLocaStorage';
import { User } from '../interface/auth';

type values = {
    user: User;
    popup: { type: string, msg: string };
    loading: boolean;
    setPopup: (aug0: values["popup"]) => void;
    signIn: (email: string, password: string, callbackURL: string) => void; 
    signUp: ( name: string, email: string, password: string, callbackURL: string) => void;
    logOut: () => void;
}

export const AuthContext = createContext({} as values);

export function useUser() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useLocalStorage("user", null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useNavigate();

    async function signIn(email: string, password: string, callbackURL: string) {
        setLoading(true)
        await account.createEmailPasswordSession(email, password)
            .then(response => {
            setPopup({ type: "success", msg: "Login successful" })
            setUser(response)
            router(callbackURL || "/account/dashboard")
            setLoading(false)
        })
        .catch(error => {
            setLoading(true)
            setPopup({ type: "error", msg: error.message })
            setLoading(false)
        })
    }

    async function signUp(name: string, email: string, password: string, callbackURL: string) {
        setLoading(true)
        
        const promise = tablesDB.listRows({
            databaseId: "68ed2831002414dd5275",
            tableId: "waitlist",
        });

        promise.then(async function (response) { // 1️⃣ Check if username already exists
            if(response.rows.map(r => r.name.toLowerCase()).includes(name.toLowerCase())) {
                setPopup({ type: "error", msg: "Username already exists" })
                setLoading(false)
            }
            else {                
                await account.create(ID.unique(), email, password, name)
                .then(() => {
                    setPopup({ type: "success", msg: "Registered successful" })
                    tablesDB.createRow({
                        databaseId: '68ed2831002414dd5275',
                        tableId: 'waitlist',
                        rowId: ID.unique(),
                        data: { email, name }
                    });
                    signIn(email, password, callbackURL || "/account/dashboard")
                })
                .catch(error => {
                    setLoading(true)
                    setPopup({ type: "error", msg: error.message })
                })
                .finally (() => {
                    setLoading(false)
                })
            }
        }, function (error) {
            console.log(error);
            setLoading(false)
        });
    }
    
    async function logOut() {
        await account.deleteSession("current");
        setUser(null);
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch {
            setUser(null);
        }
    }

    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(popup.type === "success") {
            toast.success(popup.msg)
        }
        else if(popup.type === "error") {
            toast.error(popup.msg)
        }
    }, [popup])

    return (
        <AuthContext.Provider value={{ user, popup, loading, setPopup, signIn, signUp, logOut }}>
            <Toaster containerClassName="p-8" />
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;