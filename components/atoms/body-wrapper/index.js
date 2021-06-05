import { Container } from "@material-ui/core";
import theme from "components/theme";

export function BodyContainer({ children, hidden }) {
  return <Container
    style={{ width: "100%" }}
    className={hidden ? 'hide' : ''}
  >
    {children}
  </Container>
}

export function BodyTop({ children, hidden }) {
  return <div
    style={{ marginTop: theme.spacing(3), width: "100%" }}
    className={hidden ? 'hide' : ''}
  >
    {children}
  </div>
}
export function BodyMaxWidth({ maxWidth = 600, children, hidden }) {
  return <div
    className={hidden ? 'hide' : ''}
    style={{
      width: "100%",
      maxWidth: `${maxWidth}px`,
      margin: '0 auto'
    }} >
    {children}
  </div>
}