import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import StudyRoomLayout from "../../container/StudyRoom/Layout";
function StudyRoom(props) {
  return <StudyRoomLayout />;
}

export default withPrivateLayout(StudyRoom, { title: "Study Room" });
