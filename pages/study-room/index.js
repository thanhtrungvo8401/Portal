import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import StudyRoomLayout from "../../container/StudyRoom/Layout";
import { actionResetError } from "../../redux/actions/errorActions";
import {
  serviceCreateSetVoca,
  serviceGetSetVocas,
} from "../../service/SetVoca";
function StudyRoom(props) {
  // Variables:
  const [setVoca, setSetVoca] = useState({});
  const ERROR = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newSetVoca = { ...setVoca, [name]: value };
    setSetVoca(newSetVoca);
    dispatch(actionResetError());
  };

  const handleOnSubmitCreateVoca = (e) => {
    e.preventDefault();
    const setVocaObject = {
      ...setVoca,
      authorId: user.id,
    };
    dispatch(serviceCreateSetVoca(setVocaObject));
  };
  // FUNCTION DEFINED:
  const handleFetAllSetVoca = () => {
    dispatch(serviceGetSetVocas(user.id));
  };
  // LIFE CYCLE HOOK:
  // fetch all set-vocas:
  useEffect(() => {
    if (user.id) {
      handleFetAllSetVoca();
    }
  }, [user.id]);
  return (
    <StudyRoomLayout
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmitCreateVoca}
      ERROR={ERROR}
      setVoca={setVoca}
    />
  );
}

export default withPrivateLayout(StudyRoom, { title: "Study Room" });
