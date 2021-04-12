import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import theme from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiAccordionSummary-content": {
      justifyContent: "space-between",
    },
  },
  // Sumary group
  leftVoca: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
    width: "calc(50% - 0.5rem)",
    flexShrink: 0,
    [theme.breakpoints.up("sm")]: {
      width: "calc(50% - 1rem)",
    },
  },
  rightVoca: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
    width: "calc(50% - 0.5rem)",
    [theme.breakpoints.up("sm")]: {
      width: "calc(50% - 1rem)",
    },
  },
  // Detail group:
  detailGroup: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
  },
}));

function VocaDisplayGroup({ vocas = [] }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };
  return (
    <div className={classes.root}>
      {vocas.map((voca) => {
        return (
          <Accordion
            key={voca.id}
            expanded={expanded === voca.id}
            onChange={handleChange(voca.id)}
          >
            {/* MAIN */}
            <AccordionSummary>
              <Typography className={classes.leftVoca}>{voca.voca}</Typography>
              <Typography className={classes.rightVoca}>
                {voca.meaning}
              </Typography>
            </AccordionSummary>
            {/* DETAIL */}
            {Boolean(voca.note || voca.sentence) && (
              <AccordionDetails>
                <div>
                  {voca.note && (
                    <Typography className={classes.detailGroup}>
                      {voca.note}
                    </Typography>
                  )}
                  {voca.sentence && (
                    <Typography
                      style={{ marginTop: theme.spacing(1) }}
                      className={classes.detailGroup}
                    >
                      {voca.sentence}
                    </Typography>
                  )}
                </div>
              </AccordionDetails>
            )}
            {/* ACTION */}
            <Divider />
            <AccordionActions>
              <Button
                size="small"
                style={{ color: theme.palette.success.main }}
              >
                Edit
              </Button>
              <Button style={{ color: theme.palette.error.main }} size="small">
                Remove
              </Button>
            </AccordionActions>
          </Accordion>
        );
      })}
    </div>
  );
}

export default VocaDisplayGroup;
{
  /* Confirm Action Popup */
}
{
  /* <Dialog
        open={openConfirm}
        aria-labelledby="form-dialog-title"
        onClose={handleCloseConfirmRemoveVoca}
      >
        <DialogTitle id="form-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>Are you sure want to remove this voca!</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmRemoveVoca}>Cancel</Button>
          <Button onClick={handleRemoveVoca}>
            <Typography color="error" variant="button">
              Remove
            </Typography>
          </Button>
        </DialogActions>
      </Dialog> */
}
