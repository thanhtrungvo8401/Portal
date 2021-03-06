import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import ActionGroup from "../../components/ActionGroup";
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
  const { listVocas, voca } = props;
  console.log(voca);
  return (
    <React.Fragment>
      <ParagraphTitle>A vocabulary example</ParagraphTitle>
      <Voca isExample={true} />

      <ParagraphTitle>Your vocabularies</ParagraphTitle>
      <div className={classes.setVocas}>
        {listVocas.map((el, index) => {
          return <Voca key={index} />;
        })}
      </div>
      <ActionGroup>
        <Button
          color="primary"
          variant="contained"
          // onClick={props.handleOnSubmit}
          // disabled={!isValidSubmit}
        >
          Create (+)
        </Button>
      </ActionGroup>
    </React.Fragment>
  );
}

export default Layout;
