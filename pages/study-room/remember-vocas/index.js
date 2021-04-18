import { useDispatch } from "react-redux";
import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";
import RememberVocasLayout from "../../../container/RememberVoca/Layout";
import { serviceCreateRemember } from "../../../service/rememberService";
import { storageKey } from "../../../utils/Constant";
import { localStorageHelper } from "../../../utils/storageHelper";

function RememberVocas(props) {
  const dispatch = useDispatch();

  const submitCreateRemember = (object) => {
    const { vocas, name } = object;
    const codes = vocas.map((el) => el.code);
    const user =
      JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
    const remember = {
      name,
      ownerId: user.id,
      vocaCodes: codes.join(","),
      activeCodes: codes.join(","),
    };
    dispatch(serviceCreateRemember(remember));
  };
  const actionDeleteRemember = (rememberId) => {
    console.log("Remove " + rememberId);
  };
  return <RememberVocasLayout actionDelete={actionDeleteRemember} submitCreateRemember={submitCreateRemember} />;
}

export default withPrivateLayout(RememberVocas, {
  title: "Study Room - Remember all vocabularies now!",
});
