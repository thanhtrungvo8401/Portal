import { withLayout } from "../../components/Layouts/Layout";
import Layout from "../../container/SetVocas/Layout";

function SetVocas(props) {
  return <Layout />;
}

export default withLayout(SetVocas, { title: "Vocabularies list!" });
