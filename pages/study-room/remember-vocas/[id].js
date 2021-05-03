import { useRouter } from "next/router";
import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";

function StudyRememberGroupById() {
  const { id } = useRouter().query;

  return <div>{id}</div>;
}

export default withPrivateLayout(StudyRememberGroupById, {
  title: "Study room - Enjoy your study",
});
