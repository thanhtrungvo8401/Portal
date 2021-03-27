import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";
import RememberVocasLayout from "../../../container/RememberVoca/Layout";

function RememberVocas(props) {
  return <RememberVocasLayout />;
}

export default withPrivateLayout(RememberVocas, {
  title: "Study Room - Remember all vocabularies now!",
});
