import { Button, Typography } from "@material-ui/core";
import ParagraphTitle from "../../components/ParagraphTitle";
import SetVoca from "../../components/SetVoca";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import ActionGroup from "../../components/ActionGroup";
function StudyRoomLayout(props) {
  return (
    <div className="stydy-room-layout">
      <ParagraphTitle>An example vocabularies group</ParagraphTitle>
      <SetVoca
        name="Lesson 20: gohan wo tapemasuta"
        number={7}
        time={Date.now()}
      />
      <ParagraphTitle>Your vocabularies groups</ParagraphTitle>
      <Typography variant="body1">
        There are no vocabularies group in your room, Click into the following
        (+) Icon to create a new one!
      </Typography>

      <ActionGroup>
        <Button color="primary" variant="contained">
          <AddCircleOutlineOutlinedIcon color="secondary" />
        </Button>
      </ActionGroup>
    </div>
  );
}

export default StudyRoomLayout;
