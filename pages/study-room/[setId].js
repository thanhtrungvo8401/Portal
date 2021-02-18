import { useRouter } from "next/router";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import Layout from "../../container/SetVocas/Layout";

function SetVocas(props) {
  const router = useRouter();
  const { setId } = router.query;
  console.log(setId + " is the setId");
  return <Layout />;
}

export default withPrivateLayout(SetVocas, { title: "Vocabularies list!" });
