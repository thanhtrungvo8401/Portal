import { makeStyles } from "@material-ui/core";
import React from "react";
import ParagraphTitle from "../../components/ParagraphTitle";
import Voca from "../../components/Voca";

const useStyles = makeStyles((theme) => {
  return {
    setVocas: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "flex-start",
      [theme.breakpoints.up("md")]: {
        justifyContent: "space-between",
      },
    },
  };
});

function Layout(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ParagraphTitle>A vocabulary example</ParagraphTitle>
      <Voca />

      <ParagraphTitle>Your vocabularies</ParagraphTitle>
      <div className={classes.setVocas}>
        <Voca />
        <Voca />
      </div>
    </React.Fragment>
  );
}

export default Layout;
