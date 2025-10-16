import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPages from "./pages/auth"
import StaticPages from "./pages/static"
import AuthProvider from "./context/authContext"
import AccountPages from "./pages/account"

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth/*" element={<AuthPages />} />
            <Route path="/*" element={<StaticPages />} />
            <Route path="/account/*" element={<AccountPages />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
