import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";
import RememberVocasLayout from "../../../container/RememberVoca/Layout";

function RememberVocas(props) {
  const submitCreateRemember = (remember) => {
    const { vocas, name } = remember;
    
  };
  return <RememberVocasLayout submitCreateRemember={submitCreateRemember} />;
}

export default withPrivateLayout(RememberVocas, {
  title: "Study Room - Remember all vocabularies now!",
});
