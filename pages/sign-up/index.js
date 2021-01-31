import { withLayout } from "../../components/Layouts/Layout";
import SignUpLayout from "../../container/SignUp/Layout";

function SignUp(props) {
  return <SignUpLayout />;
}

export default withLayout(SignUp, "Create new account!");
