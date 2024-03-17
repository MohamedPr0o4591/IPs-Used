import React from "react";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";

function App() {
  React.useEffect(() => {
    if (!localStorage.login) {
      localStorage.login = "";
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
