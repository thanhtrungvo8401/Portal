import { withLayout } from "../../components/Layouts/Layout";
import StudyRoomLayout from "../../container/StudyRoom/Layout";
function StudyRoom(props) {
  return <StudyRoomLayout />;
}

export default withLayout(StudyRoom, { title: "Study Room" });
