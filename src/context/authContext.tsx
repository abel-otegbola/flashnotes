'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwrite";
import { useLocalStorage } from '../customHooks/useLocaStorage';
import { User } from '../interface/auth';

type values = {
    user: User;
    popup: { type: string, msg: string };
    loading: boolean;
    setPopup: (aug0: values["popup"]) => void;
    signIn: (email: string, password: string, callbackURL: string) => void; 
    signUp: (email: string, password: string, callbackURL: string) => void;
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

    const formatError = (msg: string) => {
        return msg.replace("Firebase: Error (auth/", "").replace("-", " ").replace(")", "")
    }

    async function signIn(email: string, password: string, callbackURL: string) {
        setLoading(true)
        await account.createEmailPasswordSession(email, password)
            .then(response => {
            setPopup({ type: "success", msg: "Login successful" })
            setUser(response)
            router(callbackURL || "/dashboard")
            setLoading(false)
        })
        .catch(error => {
            setLoading(true)
            setPopup({ type: "error", msg: error.message })
            setLoading(false)
        })
    }

    async function signUp(email: string, password: string, callbackURL: string) {
        setLoading(true)
        await account.create(ID.unique(), email, password)
        .then(() => {
            setPopup({ type: "success", msg: "Registered successful" })
            signIn(email, password, callbackURL);
        })
        .catch(error => {
            setLoading(true)
            setPopup({ type: "error", msg: error.message })
            setLoading(false)
        })
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