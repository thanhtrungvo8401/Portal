import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import StudyRoomLayout from "../../container/StudyRoom/Layout";
import { actionResetError } from "../../redux/actions/errorActions";
function StudyRoom(props) {
  // Variables:
  const [setVoca, setSetVoca] = useState({});
  const ERROR = useSelector((state) => state.error);
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newSetVoca = { ...setVoca, [name]: value };
    setSetVoca(newSetVoca);
    dispatch(actionResetError());
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // dispatch service:
    console.log(setVoca);
  };
  return (
    <StudyRoomLayout
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      ERROR={ERROR}
      setVoca={setVoca}
    />
  );
}

export default withPrivateLayout(StudyRoom, { title: "Study Room" });
