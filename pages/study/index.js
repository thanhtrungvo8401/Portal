import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import StudyLayout from "../../container/Study/Layout";

function Study (props) {
  return <StudyLayout />
}

export default withPrivateLayout(Study, "Study Now")