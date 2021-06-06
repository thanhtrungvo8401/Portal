import { useDispatch, useSelector } from "react-redux";
import { withLayout } from "components/templates/main";
import SignUpUI from "components/organisms/sign-up";
import { actionSetError, actionResetError } from "redux/actions/errorActions";
import { constCODE } from "utils/CodeToMessages";
import { serviceSignUp } from "service/authenticate";
import { actionSetUserSignup } from "redux/actions/loginActions";
import { useEffect } from "react";
import { navigate } from "utils/Helper";
import { appUrl } from "utils/APP_URL";

function SignUp(props) {
  const user = useSelector((state) => state.login.userSignUp);
  const isLogined = useSelector((state) => state.login.isLogined);
  const ERROR = useSelector((state) => state.error);
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    const userSignUp = { ...user, [name]: value };
    if (userSignUp["password"] !== userSignUp["confirmPassword"]) {
      dispatch(
        actionSetError({ confirmPassword: constCODE.PASSWORD_NOT_MATCH })
      );
    } else {
      dispatch(actionResetError());
    }
    dispatch(actionSetUserSignup(userSignUp));
  };
  const handleOnSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();
    const userSignUp = {
      email: user["email"],
      password: user["password"],
    };
    dispatch(serviceSignUp(userSignUp));
  };
  // life cycle hook:
  useEffect(() => {
    if (isLogined) {
      navigate(appUrl.dashboard().url);
    }
  }, [isLogined]);
  return (
    <SignUpUI
      user={user}
      ERROR={ERROR}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
}

export default withLayout(SignUp, "Create new account!");
