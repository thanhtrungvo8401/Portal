import { Accordion, AccordionDetails, AccordionSummary, makeStyles } from "@material-ui/core"
import React from "react";

const useStyles = makeStyles(theme => ({ root: { width: "100%" } }));
/**
 * 
 * @param item { summaryEl, detailEl }
 */
export default function ListExpandItem({ items = [] }) {
  const [expanded, setExpanded] = React.useState(-1);
  const handleChange = (index) => (e, isExpanded) => {
    setExpanded(isExpanded ? index : -1);
  }
  return <div className={useStyles().root} >
    {items.map((item, i) => {
      return <Accordion key={i} expanded={expanded === i} onChange={handleChange(i)} >
        <AccordionSummary aria-controls={`panel${i}bh-content`} id={`panel${i}bh-header`} >
          {item.summaryEl}
        </AccordionSummary>
        <AccordionDetails>
          {item.detailEl}
        </AccordionDetails>
      </Accordion>
    })}
  </div>
}