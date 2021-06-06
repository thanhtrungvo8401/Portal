import { withPrivateLayout } from "components/templates/main";
import TestVocasLayout from "container/TestVocas/Layout";

function TestVocas(props) {
  return <TestVocasLayout />;
}

export default withPrivateLayout(TestVocas, {
  title: "Study Room - Testing and Result!",
});
