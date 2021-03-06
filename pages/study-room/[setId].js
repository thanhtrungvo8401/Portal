import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import Layout from "../../container/SetVocas/Layout";
import { actionResetError } from "../../redux/actions/errorActions";
import { actionSetVocabularyObject } from "../../redux/actions/vocaActions";
import { serviceGetSetVocaDetail } from "../../service/SetVoca";
import { serviceFetVocaBySetId } from "../../service/vocaService";

function SetVocas(props) {
  const router = useRouter();
  const { setId } = router.query;
  const dispatch = useDispatch();
  const listVocas = useSelector((state) => state.vocas.list);
  const voca = useSelector((state) => state.vocas.voca);
  // UI interact:
  const handleOnChangeCreate = (e) => {
    const { name, value } = e.target;
    const newVoca = { ...voca, [name]: value };
    dispatch(actionSetVocabularyObject(newVoca));
    dispatch(actionResetError());
  };

  const handleOnSubmitCreate = (e) => {
    e.preventDefault();
  };

  // Function Define:
  const handleGetSetVocaDetail = (setId) => {
    dispatch(serviceGetSetVocaDetail(setId));
  };
  const handleFetchVocasBySetId = (setId) => {
    dispatch(serviceFetVocaBySetId(setId));
  };
  // Life cycle hook:
  useEffect(() => {
    if (setId) {
      handleGetSetVocaDetail(setId);
      handleFetchVocasBySetId(setId);
    }
  }, [setId]);
  return <Layout listVocas={listVocas} voca={voca} />;
}

export default withPrivateLayout(SetVocas, { title: "Vocabularies list!" });
