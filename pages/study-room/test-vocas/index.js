import { withPrivateLayout } from "components/Layouts/PrivateLayout";
import TestVocasLayout from "container/TestVocas/Layout";

function TestVocas(props) {
  return <TestVocasLayout />;
}

export default withPrivateLayout(TestVocas, {
  title: "Study Room - Testing and Result!",
});
