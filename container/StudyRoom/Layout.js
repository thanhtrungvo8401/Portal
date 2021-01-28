import SetVoca from "../../components/SetVoca";
import styles from "./styles.module.scss";

function StudyRoomLayout(props) {
  return (
    <div className={styles.studyRoom}>
      <SetVoca name="Lesson 20: gohan wo tapemasuta" number={7} time={Date.now()} />
    </div>
  );
}

export default StudyRoomLayout;
