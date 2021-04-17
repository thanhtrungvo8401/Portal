import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import theme from "../../components/theme";

const step4Styles = makeStyles((theme) => ({
  root: {},
}));

export default function Step4({ object, actionUpdate }) {
  const { setVoca, isRemoveStudiedVoca } = object;
  const classes = step4Styles();
  return (
    <div className={classes.root}>
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        Your remember-group will be created from{" "}
        <span style={{ fontStyle: "italic" }}>{setVoca.setName}</span>
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name="isRemoveStudiedVoca"
            checked={isRemoveStudiedVoca}
            onChange={(e) =>
              actionUpdate({ ...object, isRemoveStudiedVoca: e.target.checked })
            }
          />
        }
        label="Remove studied vocabularies"
      />
      <Typography hidden={isRemoveStudiedVoca} variant="caption" color="error">
        You should use click into this option to avoid repeating the word that
        you have already remembered!!!
      </Typography>
    </div>
  );
}
