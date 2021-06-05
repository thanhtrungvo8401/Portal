import { Button, Typography } from "@material-ui/core";
import { useSelector } from "react-redux"
import theme from "../../components/theme";

export default function TestGroupStep1({ actionChangeStep }) {
  const { list } = useSelector(state => state.vocas);
  const totalQuestion = list.length * 2;
  return <div style={{
    marginTop: theme.spacing(2)
  }} >
    <Typography
      style={{ textAlign: "center" }}
      color="primary"
      variant="h1"
      component="div"
    >
      {totalQuestion}
    </Typography>
    <Typography
      variant="h6"
      component="div"
      style={{ textAlign: "center" }}>
      câu hỏi đang đợi bạn vượt qua
    </Typography>

    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(5)
    }} >
      <Button
        color="primary"
        variant="contained"
        onClick={() => actionChangeStep(2)}
      >
        I am Ready
      </Button>
    </div>
  </div>
}