import { withLayout } from "../../components/Layouts/Layout";
import { LinearProgress, Toolbar } from "@material-ui/core";

function TopStudent() {
  return (
    <div style={{ backgroundColor: "lightblue" , height: "5rem"}}>
      <LinearProgress color="primary" />
      <Toolbar />
      <LinearProgress color="secondary" />
    </div>
  );
}

export default withLayout(TopStudent);
