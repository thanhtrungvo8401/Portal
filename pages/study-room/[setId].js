import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import Layout from "../../container/SetVocas/Layout";
import { actionResetError } from "../../redux/actions/errorActions";
import { actionSetVocabularyObject } from "../../redux/actions/vocaActions";
import {
  serviceCreateVoca,
  serviceDeleteVocaById,
  serviceFetVocaBySetId,
} from "../../service/vocaService";

function SetVocas(props) {
  const router = useRouter();
  const { setId } = router.query;
  const dispatch = useDispatch();
  const listVocas = useSelector((state) => state.vocas.list);
  const voca = useSelector((state) => state.vocas.voca);
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
  const handleOnSubmitCreate = () => {
    const vocaObject = { ...voca, setId };
    dispatch(serviceCreateVoca(vocaObject));
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
      handleOnSubmitCreate={handleOnSubmitCreate}
      handleOnRemoveVocaById={handleOnRemoveVocaById}
      listVocas={listVocas}
      voca={voca}
      ERROR={ERROR}
    />
  );
}

export default withPrivateLayout(SetVocas, { title: "Vocabularies list!" });
