import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPages from "./pages/auth"
import StaticPages from "./pages/static"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthPages />} />
        <Route path="/*" element={<StaticPages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
