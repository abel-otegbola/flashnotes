import { Link, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Sidebar from "../../components/sidebar/sidebar";
import Input from "../../components/input/input";
import { AddCircle, Bell, Magnifer } from "@solar-icons/react";
import { Formik } from "formik";
import Button from "../../components/button/button";
import LogoIcon from "../../assets/icons/logo";
import Tasks from "./tasks/page";

function AccountPages() {
  return (
    <div className="min-h-[400px] flex justify-between bg-gray-100 dark:bg-[#101010]">
        <Sidebar />
        <div className="flex flex-col flex-1 gap-4 md:mt-4 md:mr-4 md:ml-0 ml-0">
            <div className="flex p-4 md:rounded-[10px] items-center justify-between bg-white dark:bg-[#151515]">
                <Formik
                    initialValues={{ search: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)
                        setSubmitting(false);
                    }}
                >
                    {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-[#202020] rounded-[10px] border border-gray-100 dark:border-gray-500/[0.3] md:block hidden">
                        <Input leftIcon={<Magnifer />} placeholder="Search or type a command" onChange={handleChange} name="search" className="md:w-[300px]" value={values.search} error={touched.search ? errors.search : ""} />
                    </form>
                    )
                }
                </Formik>
                <LogoIcon className="md:hidden"/>

                <div className="flex gap-6 items-center">
                    <Button><AddCircle /> Create</Button>
                    <button className="relative p-2">
                        <Bell size={24}/> 
                        <span className="absolute top-0 right-2 p-1 w-1 h-1 rounded-lg bg-red-500"></span>
                    </button>
                    <Link to="/account">
                        <img src="/profile_pic.png" width={32} height={32} alt="avatar" className="rounded-full" />
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Navigate to={"/account/dashboard"} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </div>
    </div>
  )
}

export default AccountPages