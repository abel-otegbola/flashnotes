import { Route, Routes } from "react-router-dom";
import Topbar from "../../components/topbar/topbar";
import Home from "./home/home";
import Footer from "../../components/footer/footer";

function StaticPages() {
  return (
    <>
    <Topbar />
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
    </>
  )
}

export default StaticPages