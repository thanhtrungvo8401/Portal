import { Typography } from "@material-ui/core";
import SetVoca from "../../components/SetVoca";
import styles from "./styles.module.scss";

function StudyRoomLayout(props) {
  return (
    <div className={styles.studyRoom}>
      <Typography variant="h6" color="textPrimary" >An xample vocabularies group</Typography>
      <SetVoca
        name="Lesson 20: gohan wo tapemasuta"
        number={7}
        time={Date.now()}
      />
    </div>
  );
}

export default StudyRoomLayout;
