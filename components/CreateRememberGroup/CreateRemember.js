import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import { useDispatch, useSelector } from "react-redux";
import { actionSetIsCreating } from "../../redux/actions/rememberGroupAction";
import { constantApp } from "../../utils/Constant";

const useStyles = makeStyles((theme) => ({}));

export default function CreateRememberGroup() {
  const classes = useStyles();
  const { isCreating } = useSelector((state) => state.rememberGroup);
  const [isRender, setIsRender] = useState(isCreating);
  const dispatch = useDispatch();

  // this useEffect to and hide component
  useEffect(() => {
    if (isCreating) setIsRender(true);
    else {
      setTimeout(() => setIsRender(false), constantApp.timeOutUseEffect);
    }
  }, [isCreating]);

  return (
    isRender && (
      <Grow
        in={isCreating}
        style={{ transformOrigin: "0 0 0" }}
        {...(isCreating ? { timeout: constantApp.timeout } : {})}
      >
        <Paper elevation={4} className={classes.paper}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          <button
            onClick={() => {
              dispatch(actionSetIsCreating(false));
            }}
          >
            Cancle
          </button>
        </Paper>
      </Grow>
    )
  );
}
