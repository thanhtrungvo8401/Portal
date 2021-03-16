import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../components/Layouts/PrivateLayout";
import StudyRoomLayout from "../../container/StudyRoom/Layout";
import { actionResetError } from "../../redux/actions/errorActions";
import {
  actionSetValueForlistEditing,
  actionSetValueForSetVocaEditing,
  actionSetvocaObject,
} from "../../redux/actions/setVocasActions";
import {
  serviceCreateSetVoca,
  serviceDeleteSetVocas,
  serviceGetSetVocas,
  serviceUpdateSetVoca,
} from "../../service/SetVoca";
function StudyRoom(props) {
  // Variables:
  const setVoca = useSelector((state) => state.setVocas).setVoca;
  const setVocaEditing = useSelector((state) => state.setVocas).setVocaEditing;
  const ERROR = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const listSetVocas = useSelector(
    (state) => state.setVocas && state.setVocas.list
  );
  const listEditing = useSelector((state) => state.setVocas).listEditing;
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

  const handleOnSubmitUpdateVoca = () => {
    const setVocaObject = {
      ...setVocaEditing,
    };
    dispatch(serviceUpdateSetVoca(setVocaObject));
  };

  const handleOnRemoveItem = (item) => {
    dispatch(serviceDeleteSetVocas(item.id));
  };

  const handleOnAllowEditSetVoca = (setVoca) => {
    dispatch(actionSetValueForlistEditing(setVoca));
    dispatch(actionSetValueForSetVocaEditing(setVoca));
  };

  const handleOnChangeEditing = (e) => {
    const { name, value } = e.target;
    const newSetVoca = { ...setVocaEditing, [name]: value };
    dispatch(actionSetValueForSetVocaEditing(newSetVoca));
    dispatch(actionResetError());
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
      listEditing={listEditing}
      handleOnRemoveItem={handleOnRemoveItem}
      handleOnAllowEditSetVoca={handleOnAllowEditSetVoca}
      handleResetSetVoca={handleResetSetVoca}
      handleOnChangeEditing={handleOnChangeEditing}
      handleOnSubmitUpdateVoca={handleOnSubmitUpdateVoca}
    />
  );
}

export default withPrivateLayout(StudyRoom, { title: "Study Room" });
