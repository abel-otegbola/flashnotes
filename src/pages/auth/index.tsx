import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Waitlist from "./waitlist";

function AuthPages() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/waitlist" element={<Waitlist />} />
    </Routes>
  )
}

export default AuthPages