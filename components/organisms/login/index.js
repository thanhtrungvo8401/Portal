import { useDispatch, useSelector } from "react-redux";
import { actionResetError } from "redux/actions/errorActions";
import { actionSetUserLogin } from "redux/actions/loginActions";
import { serviceLogin } from "service/authenticate";
import { closeLoginForm } from "utils/Helper";
import LoginUI from "components/organisms/login/UI";

export default function Login(props) {
  const showLogin = useSelector(
    (state) => state.login && state.login.showLogin
  );
  const user = useSelector((state) => state.login.userLogin);
  const ERROR = useSelector((state) => state.error);
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleCloseLogin = () => {
    closeLoginForm();
  };
  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    const userLogin = { ...user, [name]: value };
    dispatch(actionSetUserLogin(userLogin));
    dispatch(actionResetError());
  };
  const handleOnSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();
    const userLogin = {
      email: user["email"],
      password: user["password"],
    };
    dispatch(serviceLogin(userLogin));
  };
  return (
    <LoginUI
      user={user}
      ERROR={ERROR}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      showLogin={showLogin}
      handleCloseLogin={handleCloseLogin}
    />
  );
}