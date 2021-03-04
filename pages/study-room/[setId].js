import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import Layout from "../../container/SetVocas/Layout";
import { serviceGetSetVocaDetail } from "../../service/SetVoca";

function SetVocas(props) {
  const router = useRouter();
  const { setId } = router.query;
  const dispatch = useDispatch();
  // Function Define:
  const handleGetSetVocaDetail = (setId) => {
    dispatch(serviceGetSetVocaDetail(setId));
  };
  // Life cycle hook:
  useEffect(() => {
    handleGetSetVocaDetail(setId);
  }, []);
  return <Layout />;
}

export default withPrivateLayout(SetVocas, { title: "Vocabularies list!" });
