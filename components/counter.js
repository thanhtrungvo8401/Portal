import { Button, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementCount,
  decrementCount,
  resetCount,
} from "../redux/actions/actions";

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h6" color="error">
        Count: <span>{count}</span>
      </Typography>
      <Button
        color="primary"
        onClick={() => dispatch(incrementCount())}
        variant={"contained"}
      >
        + 1
      </Button>
      <Button
        color="inherit"
        onClick={() => dispatch(decrementCount())}
        variant={"contained"}
      >
        -1
      </Button>
      <Button
        color="secondary"
        onClick={() => dispatch(resetCount())}
        variant={"contained"}
      >
        Reset
      </Button>
    </div>
  );
};

export default Counter;
