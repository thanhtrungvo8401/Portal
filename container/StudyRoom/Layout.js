import { Button, makeStyles, Typography } from "@material-ui/core";
import ParagraphTitle from "../../components/ParagraphTitle";
import SetVoca from "../../components/SetVoca";
import ActionGroup from "../../components/ActionGroup";
import { useEffect, useRef, useState } from "react";
import InputGroup, { validForm } from "../../components/InputGroup";
import ParagraphBody from "../../components/ParagraphBody";

const inputFields = ["setName"];
const inputTypes = {
  setName: "input",
};
const inputLabels = {
  setName: "Lesson XX: X X X X",
};
const inputRequired = ["setName"];
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
  const { listSetVocas, handleOnRemoveItem, handleOnEditItem } = props;
  const prevListLength = useRef(null);
  // UI INTERACT:
  const handleShowCreate = () => {
    setCreateForm(true);
  };
  const handleCloseCreate = () => {
    setCreateForm(false);
  };
  useEffect(() => {
    if (listSetVocas.length - prevListLength.current === 1) {
      handleCloseCreate();
      if (props.handleResetSetVoca) props.handleResetSetVoca();
    }
  }, [listSetVocas]);

  useEffect(() => {
    prevListLength.current = listSetVocas.length;
  });
  return (
    <div className="stydy-room-layout">
      <ParagraphTitle>An example vocabularies group</ParagraphTitle>
      <ParagraphBody>
        <SetVoca
          isExample={true}
          name="Lesson 20: gohan wo tapemasuta"
          number={7}
          time={Date.now()}
        />
      </ParagraphBody>

      <ParagraphTitle>Your vocabularies groups</ParagraphTitle>
      <ParagraphBody>
        {listSetVocas.map((el, index) => {
          return (
            <SetVoca
              key={index}
              name={el.setName}
              number={el.totalVocas}
              time={el.createdDate}
              item={el}
              handleOnRemoveItem={handleOnRemoveItem}
              handleOnEditItem={handleOnEditItem}
            />
          );
        })}
        {!isShowCreateForm && !listSetVocas.length && (
          <Typography variant="body1">
            There are no vocabularies group in your room, Click into the
            following (+) Icon to create a new one!
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
      </ParagraphBody>

      <ActionGroup>
        {isShowCreateForm && (
          <Button
            color="action"
            variant="contained"
            onClick={handleCloseCreate}
          >
            Cancle
          </Button>
        )}
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
