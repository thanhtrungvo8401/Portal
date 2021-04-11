import {
  Accordion,
  AccordionSummary,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    " .MuiAccordionSummary-content": {
      justifyContent: "space-between",
    },
  },
  // Sumary group
  num: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    width: "1rem",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      width: "2rem",
    },
  },
  voca: {
    fontSize: theme.typography.pxToRem(15),
    width: "calc(50% - 1rem)",
    flexShrink: 0,
    [theme.breakpoints.up("sm")]: {
      width: "calc(50% - 2rem)",
    },
  },
  meaning: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    width: "calc(50% - 1rem)",
    [theme.breakpoints.up("sm")]: {
      width: "calc(50% - 2rem)",
    },
  },
  //
}));

function VocaDisplayGroup({ vocas = [] }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (code) => (event, isExpanded) => {
    setExpanded(isExpanded ? code : false);
  };
  return (
    <div className={classes.root}>
      {vocas.map((voca, index) => {
        return (
          <Accordion
            key={voca.code + index}
            expanded={expanded === voca.code}
            onChange={handleChange(voca.code)}
          >
            <AccordionSummary>
              <Typography className={classes.num}>{index + 1}</Typography>
              <Typography className={classes.voca}>{voca.voca}</Typography>
              <Typography className={classes.meaning}>
                {voca.meaning}
              </Typography>
            </AccordionSummary>
          </Accordion>
        );
      })}
    </div>
  );
}

export default VocaDisplayGroup;
