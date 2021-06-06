import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import { actionResetError } from "redux/actions/errorActions";
import { actionSetVocabularyObject } from "redux/actions/vocaActions";
import {
  serviceCreateVoca,
  serviceFetVocaBySetId,
  serviceUpdateVoca,
} from "service/vocaService";
import React from "react";
import TitlePage from "components/atoms/title-page";
import { BodyContainer } from "components/atoms/body-wrapper";
import MyVocasInstruction from "components/organisms/my-vocas-[id]/instruction";
import MyVocasBody from "components/organisms/my-vocas-[id]/body";

function SetVocasDetail(props) {
  const router = useRouter();
  const { setId } = router.query;
  const dispatch = useDispatch();
  const voca = useSelector((state) => state.vocas).voca;

  // const handleOnChangeVoca = (e) => {
  //   const { name, value } = e.target;
  //   const newVoca = { ...voca, [name]: value };
  //   dispatch(actionSetVocabularyObject(newVoca));
  //   dispatch(actionResetError());
  // };
  // const handleOnSubmitVocaModal = () => {
  //   if (!voca.id) {
  //     dispatch(serviceCreateVoca({ ...voca, setId }));
  //   } else {
  //     dispatch(serviceUpdateVoca(voca));
  //   }
  // };
  // Life cycle hook:
  useEffect(() => {
    if (setId) {
      dispatch(serviceFetVocaBySetId(setId));
    }
  }, [setId]);
  return (
    <React.Fragment>
      <TitlePage>Từ vựng của tôi</TitlePage>
      <BodyContainer>
        <MyVocasInstruction />
        <MyVocasBody />
      </BodyContainer>
    </React.Fragment>
  );
}

export default withPrivateLayout(SetVocasDetail, {
  title: "Vocabularies list!",
});
