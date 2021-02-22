import { Typography } from "@material-ui/core";
import ParagraphTitle from "../../components/ParagraphTitle";
import SetVoca from "../../components/SetVoca";
import styles from "./styles.module.scss";

function StudyRoomLayout(props) {
  return (
    <div className={styles.studyRoom}>
      <ParagraphTitle>An example vocabularies group</ParagraphTitle>
      <SetVoca
        name="Lesson 20: gohan wo tapemasuta"
        number={7}
        time={Date.now()}
      />
      <ParagraphTitle>Your vocabularies groups</ParagraphTitle>
    </div>
  );
}

export default StudyRoomLayout;
