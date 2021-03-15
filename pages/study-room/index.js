import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import StudyRoomLayout from "../../container/StudyRoom/Layout";
import { actionResetError } from "../../redux/actions/errorActions";
import { actionSetValueForlistEditing, actionSetvocaObject } from "../../redux/actions/setVocasActions";
import {
  serviceCreateSetVoca,
  serviceDeleteSetVocas,
  serviceGetSetVocas,
} from "../../service/SetVoca";
function StudyRoom(props) {
  // Variables:
  const setVoca = useSelector((state) => state.setVocas.setVoca);
  const ERROR = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const listSetVocas = useSelector(
    (state) => state.setVocas && state.setVocas.list
  );
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newSetVoca = { ...setVoca, [name]: value };
    dispatch(actionSetvocaObject(newSetVoca));
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

  const handleOnRemoveItem = (item) => {
    dispatch(serviceDeleteSetVocas(item.id));
  };

  const handleOnAllowEditSetVoca = (setVoca) => {
    dispatch(actionSetValueForlistEditing(setVoca));
  };

  const handleResetSetVoca = () => {
    dispatch(actionSetvocaObject({}));
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
      listSetVocas={listSetVocas}
      handleOnRemoveItem={handleOnRemoveItem}
      handleOnAllowEditSetVoca={handleOnAllowEditSetVoca}
      handleResetSetVoca={handleResetSetVoca}
    />
  );
}

export default withPrivateLayout(StudyRoom, { title: "Study Room" });
