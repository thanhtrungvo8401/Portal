import { Button, makeStyles, Typography } from "@material-ui/core";
import ParagraphTitle from "../../components/ParagraphTitle";
import SetVoca from "../../components/SetVoca";
import ActionGroup from "../../components/ActionGroup";
import { useState } from "react";
import InputGroup, { validForm } from "../../components/InputGroup";

const inputFields = ["name"];
const inputTypes = {
  name: "input",
};
const inputLabels = {
  name: "Lesson XX: X X X X",
};
const inputRequired = ["name"];
const useStyles = makeStyles((theme) => {
  return {
    setVocaForm: {
      marginTop: theme.spacing(-4),
    },
  };
});

function StudyRoomLayout(props) {
  const classes = useStyles();
  const [isShowCreateForm, setCreateForm] = useState(false);
  const isValidSubmit = validForm(props.setVoca, inputRequired, props.ERROR);

  // UI INTERACT:
  const handleShowCreate = () => {
    setCreateForm(true);
  };
  const handleCloseCreate = () => {
    setCreateForm(false);
  };
  return (
    <div className="stydy-room-layout">
      <ParagraphTitle>An example vocabularies group</ParagraphTitle>
      <SetVoca
        name="Lesson 20: gohan wo tapemasuta"
        number={7}
        time={Date.now()}
      />

      <ParagraphTitle>Your vocabularies groups</ParagraphTitle>
      {!isShowCreateForm && (
        <Typography variant="body1">
          There are no vocabularies group in your room, Click into the following
          (+) Icon to create a new one!
        </Typography>
      )}

      {isShowCreateForm && (
        <div className={classes.setVocaForm}>
          <InputGroup
            ERROR={props.ERROR}
            inputFields={inputFields}
            inputTypes={inputTypes}
            inputLabels={inputLabels}
            inputRequired={inputRequired}
            object={props.setVoca}
            handleOnChange={props.handleOnChange}
            handleOnSubmit={props.handleOnSubmit}
          />
        </div>
      )}

      <ActionGroup>
        {isShowCreateForm && (
          <Button
            color="primary"
            variant="contained"
            onClick={props.handleOnSubmit}
            disabled={!isValidSubmit}
          >
            Save
          </Button>
        )}
        {isShowCreateForm && (
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCloseCreate}
          >
            Cancle
          </Button>
        )}
        {!isShowCreateForm && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleShowCreate}
          >
            Create (+)
          </Button>
        )}
      </ActionGroup>
    </div>
  );
}

export default StudyRoomLayout;
