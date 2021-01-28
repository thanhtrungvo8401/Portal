import { withLayout } from "../../components/Layouts/Layout";
import StudyRoomLayout from "./Layout";
function StudyRoom(props) {
  return <StudyRoomLayout />;
}

export default withLayout(StudyRoom, { title: "Study Room" });
