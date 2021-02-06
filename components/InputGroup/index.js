import { useState } from "react";
import { codeToMessagesObject } from "../../utils/CodeToMessages";

import { Button, makeStyles, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => {
  return {
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };
});

function InputGroup(props) {
  const classes = useStyles();
  const {
    inputFields,
    inputTypes,
    inputLabels,
    inputRequired,
    object,
    submitTitle,
  } = props;
  const { handleOnChange, handleOnSubmit } = props;
  const [INTERACT, setINTERACT] = useState({});
  const isValidForm = validForm(object, inputRequired);

  // UI INTERACT:
  const handleOnChangeF = (e) => {
    const target = e.target;
    setINTERACT({
      ...INTERACT,
      [target.name]: true,
    });
    handleOnChange(e);
  };

  return (
    <form className={classes.form} onSubmit={handleOnSubmit}>
      {inputFields.map((key) => {
        const value = object[key] || "";
        const isShowRequiredMsg =
          Boolean(!object[key]) &&
          Boolean(INTERACT[key]) &&
          inputRequired.includes(key);
        const isPassword = key.toLowerCase().includes("password");
        switch (inputTypes[key]) {
          case "input":
            return (
              <React.Fragment key={key}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleOnChangeF}
                  label={inputLabels[key]}
                  required={inputRequired.includes(key)}
                  type={isPassword ? "password" : "text"}
                />
                {isShowRequiredMsg && (
                  <Alert severity="error">
                    {codeToMessagesObject["NOT_NULL"]}
                  </Alert>
                )}
              </React.Fragment>
            );
          case "dropdown":
            break;
        }
      })}
      {Boolean(submitTitle) && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!isValidForm}
        >
          {submitTitle}
        </Button>
      )}
    </form>
  );
}

export default InputGroup;

export const validForm = (object = {}, inputRequired = []) => {
  for (const key of inputRequired) {
    if (!Boolean(object[key])) {
      return false;
    }
  }
  return true;
};
