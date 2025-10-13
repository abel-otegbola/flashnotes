import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPages from "./pages/auth"
import StaticPages from "./pages/static"
import AuthProvider from "./context/authContext"

function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth/*" element={<AuthPages />} />
            <Route path="/*" element={<StaticPages />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
