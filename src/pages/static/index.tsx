import { Route, Routes } from "react-router-dom";
import Topbar from "../../components/topbar/topbar";
import Home from "./home/home";

function StaticPages() {
  return (
    <>
    <Topbar />
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
    </>
  )
}

export default StaticPages