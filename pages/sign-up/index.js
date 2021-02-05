import { useDispatch, useSelector } from "react-redux";
import { withLayout } from "../../components/Layouts/Layout";
import SignUpLayout from "../../container/SignUp/Layout";
import { actionSetUser } from "../../redux/actions/userActions";

function SignUp(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    const newUser = { ...user, [name]: value };
    dispatch(actionSetUser(newUser));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <SignUpLayout
      user={user}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
}

export default withLayout(SignUp, "Create new account!");
