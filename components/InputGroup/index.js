import { Button, makeStyles, TextField } from "@material-ui/core";

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
  return (
    <form className={classes.form} onSubmit={handleOnSubmit}>
      {inputFields.map((key) => {
        const value = object[key] || "";
        switch (inputTypes[key]) {
          case "input":
            return (
              <TextField
                key={key}
                variant="outlined"
                margin="normal"
                fullWidth
                id={key}
                name={key}
                value={value}
                onChange={handleOnChange}
                label={inputLabels[key]}
                required={inputRequired.includes(key)}
              />
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
        >
          {submitTitle}
        </Button>
      )}
    </form>
  );
}

export default InputGroup;
