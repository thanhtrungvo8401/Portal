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
import { useDispatch, useSelector } from "react-redux";
import {
  actionSetIsShowVocaModal,
  actionSetVocabularyObject,
} from "../../redux/actions/vocaActions";
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

function VocaDisplayGroup({ onSelectVocaIdToDelete }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const list = useSelector((state) => state.vocas).list;

  const dispatch = useDispatch();
  // UI INTERACT:
  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };
  return (
    <div className={classes.root}>
      {list.map((voca) => {
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
              <Button size="small" onClick={() => setExpanded(false)}>
                Shrink
              </Button>
              <Button
                size="small"
                style={{ color: theme.palette.success.main }}
                onClick={() => {
                  dispatch(actionSetIsShowVocaModal(true));
                  dispatch(actionSetVocabularyObject({ ...voca }));
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => onSelectVocaIdToDelete(voca.id)}
                style={{ color: theme.palette.error.main }}
                size="small"
              >
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
