import React from "react";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import { BodyContainer } from "components/atoms/body-wrapper";
import RememberVocasInstruction from "components/organisms/remember-vocas/instruction";
import RememberVocasBody from "components/organisms/remember-vocas/body";
import UpdateModal from "components/organisms/remember-vocas/update-modal";
import CreateModal from "components/organisms/remember-vocas/create-modal";
import TitlePage from "components/atoms/title-page";
import { useDispatch, useSelector } from "react-redux";
import { localStorageHelper } from "utils/storageHelper";
import { CREATE_REMEMBER_TYPE, storageKey } from "utils/Constant";
import {
  serviceCreateRemember,
  serviceUpdateRemember,
} from "service/rememberService";

function RememberVocas(props) {
  const dispatch = useDispatch();
  const { rememberGroup } = useSelector(state => state.rememberGroups);

  const onSubmitCreateRemember = (object) => {
    const { vocas, name, type, multiRemember } = object;
    if (type === CREATE_REMEMBER_TYPE.TYPE_OWN_SET) {
      apiCreateRememberGroup(name, vocas);
    } else {
      Object.keys(multiRemember)
        .forEach((key, index) => {
          apiCreateRememberGroup(
            `${name}-${index + 1}`,
            multiRemember[key]
          );
        });
    }
  };
  const apiUpdateRemember = () => {
    dispatch(serviceUpdateRemember(rememberGroup));
  };
  const apiCreateRememberGroup = (name, vocas) => {
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

  return (
    <React.Fragment>
      <TitlePage>Ghi nhớ từ vựng mới</TitlePage>
      <BodyContainer>
        <RememberVocasInstruction />
        <RememberVocasBody />
        {/* UPDATE MODAL */}
        <UpdateModal onSubmit={apiUpdateRemember} />
        {/* CREATE MODAL */}
        <CreateModal onSubmit={onSubmitCreateRemember} />
      </BodyContainer>
    </React.Fragment>
  );
}

export default withPrivateLayout(RememberVocas, {
  title: "Study Room - Remember all vocabularies now!",
});
