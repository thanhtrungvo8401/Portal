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
  const handleChange = (code) => (event, isExpanded) => {
    setExpanded(isExpanded ? code : false);
  };
  return (
    <div className={classes.root}>
      {vocas.map((voca) => {
        return (
          <Accordion
            key={voca.code}
            expanded={expanded === voca.code}
            onChange={handleChange(voca.code)}
          >
            {/* MAIN */}
            <AccordionSummary>
              <Typography className={classes.leftVoca}>{voca.voca}</Typography>
              <Typography className={classes.rightVoca}>
                {voca.meaning}
              </Typography>
            </AccordionSummary>
            {/* DETAIL */}
            {Boolean(voca.note || voca.description) && (
              <AccordionDetails>
                <div>
                  <Typography
                    hidden={!voca.note}
                    className={classes.detailGroup}
                  >
                    Yomikata: {voca.note}
                  </Typography>
                  <Typography
                    hidden={!voca.description}
                    className={classes.detailGroup}
                  >
                    Sentence: {voca.description}
                  </Typography>
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
