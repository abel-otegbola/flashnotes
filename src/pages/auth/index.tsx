import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Waitlist from "./waitlist";
import SuccessPage from "./success";

function AuthPages() {
  return (
    <div className="min-h-[400px] flex justify-between">

      <div className="bg-[url('/bg.png')] bg-cover bg-center md:w-[45%] h-screen sticky top-0 md:block hidden"></div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/waitlist/success" element={<SuccessPage />} />
      </Routes>

    </div>
  )
}

export default AuthPages