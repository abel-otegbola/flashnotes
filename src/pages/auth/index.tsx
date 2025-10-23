import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";
import SuccessPage from "./success";
import SignupPage from "./signup";

function AuthPages() {
  return (
    <div className="min-h-[400px] flex justify-between">

      <div className="bg-[url('/bg.png')] bg-cover bg-center md:w-[45%] h-screen sticky top-0 md:block hidden"></div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/signup/success" element={<SuccessPage />} />
      </Routes>

    </div>
  )
}

export default AuthPages