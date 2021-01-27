import { Typography } from "@material-ui/core";
import { withLayout } from "../components/Layouts/Layout";

function Custom404() {
  return (
    <Typography variant="h1" color="error">
      404 - Page Not Found
    </Typography>
  );
}

export default withLayout(Custom404);
