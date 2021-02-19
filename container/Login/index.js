import { useDispatch, useSelector } from "react-redux";
import { actionSetUser } from "../../redux/actions/userActions";
import { closeLoginForm } from "../../utils/Helper";
import LoginLayout from "./Layout";

function Login(props) {
  const showLogin = useSelector(
    (state) => state.login && state.login.showLogin
  );
  const user = useSelector((state) => state.user);
  const ERROR = useSelector((state) => state.error);
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleCloseLogin = () => {
    closeLoginForm();
  };
  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    const newUser = { ...user, [name]: value };
    dispatch(actionSetUser(newUser));
  };
  return (
    <LoginLayout
      user={user}
      ERROR={ERROR}
      handleOnChange={handleOnChange}
      handleCloseLogin={handleCloseLogin}
      showLogin={showLogin}
    />
  );
}

export default Login;
