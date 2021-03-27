import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";
import Layout from "../../../container/SetVocas/Layout";
import { actionResetError } from "../../../redux/actions/errorActions";
import {
  actionSetVocabularyEditing,
  actionSetVocabularyObject,
} from "../../../redux/actions/vocaActions";
import {
  serviceCreateVoca,
  serviceDeleteVocaById,
  serviceFetVocaBySetId,
  serviceUpdateVoca,
} from "../../../service/vocaService";

function SetVocas(props) {
  const router = useRouter();
  const { setId } = router.query;
  const dispatch = useDispatch();
  const listVocas = useSelector((state) => state.vocas.list);
  const voca = useSelector((state) => state.vocas).voca;
  const vocaEditing = useSelector((state) => state.vocas).vocaEditing;
  const ERROR = useSelector((state) => state.error);

  const handleFetchVocasBySetId = (setId) => {
    dispatch(serviceFetVocaBySetId(setId));
  };
  const handleOnChangeCreate = (e) => {
    const { name, value } = e.target;
    const newVoca = { ...voca, [name]: value };
    dispatch(actionSetVocabularyObject(newVoca));
    dispatch(actionResetError());
  };
  const handleOnChangeUpdate = (e) => {
    const { name, value } = e.target;
    const newVoca = { ...vocaEditing, [name]: value };
    dispatch(actionSetVocabularyEditing(newVoca));
    dispatch(actionResetError());
  };
  const handleOnSubmitCreate = () => {
    const vocaObject = { ...voca, setId };
    dispatch(serviceCreateVoca(vocaObject));
  };
  const handleOnSubmitUpdate = (actionCloseExpand) => {
    const vocaObject = { ...vocaEditing };
    dispatch(serviceUpdateVoca(vocaObject, actionCloseExpand));
  };
  const handleOnRemoveVocaById = (id) => {
    dispatch(serviceDeleteVocaById(id));
  };
  // Life cycle hook:
  useEffect(() => {
    if (setId) {
      handleFetchVocasBySetId(setId);
    }
  }, [setId]);
  return (
    <Layout
      handleOnChangeCreate={handleOnChangeCreate}
      handleOnChangeUpdate={handleOnChangeUpdate}
      handleOnSubmitCreate={handleOnSubmitCreate}
      handleOnSubmitUpdate={handleOnSubmitUpdate}
      handleOnRemoveVocaById={handleOnRemoveVocaById}
      listVocas={listVocas}
      voca={voca}
      ERROR={ERROR}
    />
  );
}

export default withPrivateLayout(SetVocas, { title: "Vocabularies list!" });
