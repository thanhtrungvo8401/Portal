import { useSelector } from "react-redux";
import { closeLoginForm } from "../../utils/Helper";
import LoginLayout from "./Layout";

function Login(props) {
  const showLogin = useSelector(
    (state) => state.login && state.login.showLogin
  );

  // UI INTERACT:
  const handleCloseLogin = () => {
    closeLoginForm();
  };
  return (
    <LoginLayout handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
  );
}

export default Login;
