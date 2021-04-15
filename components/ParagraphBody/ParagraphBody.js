import { Typography } from "@material-ui/core";

export default function ParagraphBody({ children, hidden }) {
  return (
    <Typography hidden={hidden} color="textSecondary" variant="body1">
      {children}
    </Typography>
  );
}
