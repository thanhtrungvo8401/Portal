import { useState } from "react";
import LoginLayout from "./Layout";

function Login(props) {
  const [openLogin, setOpenLogin] = useState(true);

  // UI INTERACT:
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  return (
    <LoginLayout handleCloseLogin={handleCloseLogin} openLogin={openLogin} />
  );
}

export default Login;
