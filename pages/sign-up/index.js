import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withLayout } from "../../components/Layouts/Layout";
import SignUpLayout from "../../container/SignUp/Layout";
import { actionSetUser } from "../../redux/actions/userActions";
import { constCODE } from "../../utils/CodeToMessages";

function SignUp(props) {
  const user = useSelector((state) => state.user);
  const [ERROR, setERROR] = useState({});
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    const newUser = { ...user, [name]: value };
    if (newUser["password"] !== newUser["confirmPassword"]) {
      setERROR({
        confirmPassword: constCODE.PASSWORD_NOT_MATCH,
      });
    } else {
      setERROR({});
    }
    dispatch(actionSetUser(newUser));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
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
