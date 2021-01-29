import { useRouter } from "next/router";
import { withLayout } from "../../components/Layouts/Layout";
import Layout from "../../container/SetVocas/Layout";

function SetVocas(props) {
  const router = useRouter();
  const { setId } = router.query;
  console.log(setId + " is the setId");
  return <Layout />;
}

export default withLayout(SetVocas, { title: "Vocabularies list!" });
