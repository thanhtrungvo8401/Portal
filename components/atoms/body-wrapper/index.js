import { Container } from "@material-ui/core";
import theme from "components/theme";

export function BodyContainer({ children }) {
  return <Container>
    {children}
  </Container>
}

export function BodyTop({ children }) {
  return <div style={{ marginTop: theme.spacing(3) }} >
    {children}
  </div>
}