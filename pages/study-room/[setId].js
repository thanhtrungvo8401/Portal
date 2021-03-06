import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import Layout from "../../container/SetVocas/Layout";
import { serviceGetSetVocaDetail } from "../../service/SetVoca";
import { serviceFetVocaBySetId } from "../../service/vocaService";

function SetVocas(props) {
  const router = useRouter();
  const { setId } = router.query;
  const dispatch = useDispatch();
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
  return <Layout />;
}

export default withPrivateLayout(SetVocas, { title: "Vocabularies list!" });
