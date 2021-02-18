import { useDispatch, useSelector } from "react-redux";
import { withLayout } from "../../components/Layouts/Layout";
import SignUpLayout from "../../container/SignUp/Layout";
import { actionSetUser } from "../../redux/actions/userActions";
import {
  actionSetError,
  actionResetError,
} from "../../redux/actions/errorActions";
import { constCODE } from "../../utils/CodeToMessages";
import { serviceSignUp } from "../../service/authenticate";

function SignUp(props) {
  const user = useSelector((state) => state.user);
  const ERROR = useSelector((state) => state.error);
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    const newUser = { ...user, [name]: value };
    if (newUser["password"] !== newUser["confirmPassword"]) {
      dispatch(
        actionSetError({ confirmPassword: constCODE.PASSWORD_NOT_MATCH })
      );
    } else {
      dispatch(actionResetError());
    }
    dispatch(actionSetUser(newUser));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: user["email"],
      password: user["password"],
    };
    dispatch(serviceSignUp(newUser));
  };
  return (
    <SignUpLayout
      user={user}
      ERROR={ERROR}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
}

export default withLayout(SignUp, "Create new account!");
