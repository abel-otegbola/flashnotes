import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPages from "./pages/auth"
import StaticPages from "./pages/static"
import AuthProvider from "./context/authContext"
import TasksProvider from "./context/tasksContext"
import { OrganizationProvider } from "./context/organizationContext"
import AccountPages from "./pages/account"

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <AuthProvider>
          <OrganizationProvider>
            <TasksProvider>
            <Routes>
              <Route path="/auth/*" element={<AuthPages />} />
              <Route path="/*" element={<StaticPages />} />
              <Route path="/account/*" element={<AccountPages />} />
            </Routes>
            </TasksProvider>
          </OrganizationProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
