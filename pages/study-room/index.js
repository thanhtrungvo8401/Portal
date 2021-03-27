import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import StudyRoomLayout from "../../container/Study-room/Layout";

function Study (props) {
  return <StudyRoomLayout />
}

export default withPrivateLayout(Study, "Study Now")