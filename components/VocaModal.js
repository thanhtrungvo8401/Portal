import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { validForm } from "./InputGroup";
import { Alert } from "@material-ui/lab";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetIsShowVocaModal,
  actionSetVocabularyObject,
} from "../redux/actions/vocaActions";
import theme from "./theme";
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => {
  return {
    oneTextField: {
      marginBottom: theme.spacing(1),
      width: `100%`,
      "& .MuiFormControl-root.MuiTextField-root": {
        width: "100%",
      },
    },
  };
});

const inputFields = ["voca", "meaning", "note", "sentence"];
const inputLabels = {
  voca: "Vocabulary",
  meaning: "Meaning",
  note: "(1) Pronouce!",
  sentence: "(2) Sentences",
};
const inputRequired = ["voca", "meaning"];
function VocaModal({ handleOnChange, handleOnSubmit }) {
  const classes = useStyles();
  const { isShowVocaModal, voca } = useSelector((state) => state.vocas);
  const ERROR = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [INTERACT, setINTERACT] = useState({});

  // UI INTERACT:
  const handleOnChangeF = (e) => {
    const { target } = e;
    setINTERACT({
      ...INTERACT,
      [target.name]: true,
    });
    if (handleOnChange) {
      handleOnChange(e);
    }
  };
  const isCreateVocaModal = Boolean(voca.id); // true => create, false => update
  const titleVocaModal = !isCreateVocaModal
    ? "Create new vocabularies"
    : "Edit vocabularies";

  useEffect(() => {
    if (!isShowVocaModal) {
      dispatch(actionSetVocabularyObject({}));
      setINTERACT({});
    }
  }, [isShowVocaModal]);

  return (
    <Dialog
      open={isShowVocaModal}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      style={{ zIndex: 500 }}
    >
      <DialogTitle id="alert-dialog-slide-title">{titleVocaModal}</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
        >
          {inputFields.map((key, index) => {
            const value = voca[key] || "";
            const isShowRequiredMsg =
              Boolean(!voca[key]) &&
              Boolean(INTERACT[key]) &&
              inputRequired.includes(key);
            const ERR_MSG_CODE = Boolean(INTERACT[key] && ERROR[key]);
            return (
              <div key={key + index} className={classes.oneTextField}>
                <TextField
                  id={key}
                  label={inputLabels[key]}
                  type="text"
                  color="primary"
                  multiline={true}
                  required={inputRequired.includes(key)}
                  name={key}
                  value={value}
                  onChange={handleOnChangeF}
                  style={{ fontSize: theme.typography.pxToRem(14) }}
                />
                {isShowRequiredMsg && (
                  <Alert severity="error">
                    {codeToMessages(constCODE.NOT_NULL)}
                  </Alert>
                )}
                {Boolean(ERR_MSG_CODE) && (
                  <Alert severity="error">
                    {codeToMessages(ERR_MSG_CODE, "usedForField")}
                  </Alert>
                )}
              </div>
            );
          })}
        </form>
        <Typography variant="body2" style={{ marginTop: theme.spacing(1) }}>
          (1) You can empty the pronouce line if you are sure about the
          pronunciation
        </Typography>
        <Typography variant="body2" style={{ marginTop: theme.spacing(1) }}>
          (2) I highly recommend that you should make sentences with
          Vocabularies to remember it longer.!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          onClick={() => dispatch(actionSetIsShowVocaModal(false))}
        >
          Cancel
        </Button>
        <Button onClick={handleOnSubmit} size="medium" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default VocaModal;
