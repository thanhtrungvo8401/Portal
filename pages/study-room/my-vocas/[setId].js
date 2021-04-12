import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";
import Layout from "../../../container/SetVocas/Layout";
import { actionResetError } from "../../../redux/actions/errorActions";
import {
  actionSetVocabularyObject,
} from "../../../redux/actions/vocaActions";
import {
  serviceCreateVoca,
  serviceDeleteVocaById,
  serviceFetVocaBySetId,
  serviceUpdateVoca,
} from "../../../service/vocaService";

function SetVocasDetail(props) {
  const router = useRouter();
  const { setId } = router.query;
  const dispatch = useDispatch();
  const voca = useSelector((state) => state.vocas).voca;

  const handleOnChangeVoca = (e) => {
    const { name, value } = e.target;
    const newVoca = { ...voca, [name]: value };
    dispatch(actionSetVocabularyObject(newVoca));
    dispatch(actionResetError());
  };
  const handleOnSubmitVocaModal = () => {
    if (!voca.id) {
      dispatch(serviceCreateVoca({ ...voca, setId }));
    } else {
      dispatch(serviceUpdateVoca(voca));
    }
  };
  const handleOnRemoveVocaById = (id) => {
    if (id) dispatch(serviceDeleteVocaById(id));
  };
  // Life cycle hook:
  useEffect(() => {
    if (setId) {
      dispatch(serviceFetVocaBySetId(setId));
    }
  }, [setId]);
  return (
    <Layout
      handleOnChangeVoca={handleOnChangeVoca}
      handleOnSubmitVocaModal={handleOnSubmitVocaModal}
      handleOnRemoveVocaById={handleOnRemoveVocaById}
    />
  );
}

export default withPrivateLayout(SetVocasDetail, {
  title: "Vocabularies list!",
});
