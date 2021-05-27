import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";

function TestYourKnowLege(props) {
  return <div>
    TEST YOUR KNOWLEGE
  </div>;
}

export default withPrivateLayout(TestYourKnowLege, {
  title: "Study Room - Checking you memories !!!",
});
