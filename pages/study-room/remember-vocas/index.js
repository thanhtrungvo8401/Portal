import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import RememberVocasLayout from "container/RememberVoca/Layout";
import {
  serviceCreateRemember,
  serviceDeleteRememberById,
  serviceUpdateRemember,
} from "service/rememberService";
import { CREATE_REMEMBER_TYPE, storageKey } from "utils/Constant";
import { localStorageHelper } from "utils/storageHelper";

function RememberVocas(props) {
  const dispatch = useDispatch();
  const { rememberGroup } = useSelector((state) => state.rememberGroups);

  const handleCreateOneRememberGroup = (name, vocas) => {
    const codes = vocas.map((el) => el.code);
    const user =
      JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
    const remember = {
      name,
      ownerId: user.id,
      vocaCodes: codes.join(","),
    };
    dispatch(serviceCreateRemember(remember));
  };

  const submitCreateRemember = (object) => {
    const { vocas, name, type, multiRemember } = object;
    if (type === CREATE_REMEMBER_TYPE.TYPE_OWN_SET) {
      handleCreateOneRememberGroup(name, vocas);
    } else {
      Object.keys(multiRemember).forEach((key, index) => {
        handleCreateOneRememberGroup(
          `${name}-${index + 1}`,
          multiRemember[key]
        );
      });
    }
  };

  const submitUpdateRemember = () => {
    dispatch(serviceUpdateRemember(rememberGroup));
  };
  const actionDeleteRemember = (rememberId) => {
    dispatch(serviceDeleteRememberById(rememberId));
  };
  return (
    <RememberVocasLayout
      actionDelete={actionDeleteRemember}
      submitCreateRemember={submitCreateRemember}
      submitUpdateRemember={submitUpdateRemember}
    />
  );
}

export default withPrivateLayout(RememberVocas, {
  title: "Study Room - Remember all vocabularies now!",
});
