import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withPrivateLayout } from "../../../components/Layouts/PrivateLayout";
import MyVocasLayout from "../../../container/MySetVocas/Layout";
import {
  serviceCreateSetVoca,
  serviceDeleteSetVocas,
  serviceGetSetVocas,
  serviceUpdateSetVoca,
} from "../../../service/setVocaService";
import { storageKey } from "../../../utils/Constant";
import { localStorageHelper } from "../../../utils/storageHelper";
function MySetVocas(props) {
  // Variables:
  const { setVoca } = useSelector((state) => state.setVocas);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};

  const handleOnSubmitModal = () => {
    if (!setVoca.id) {
      dispatch(serviceCreateSetVoca({ ...setVoca, authorId: user.id }));
    } else {
      dispatch(serviceUpdateSetVoca(setVoca));
    }
  };

  const handleOnRemoveSetVocaById = (setVocaId) => {
    dispatch(serviceDeleteSetVocas(setVocaId));
  };

  useEffect(() => {
    if (user.id) {
      // fetch set-vocas by authorId:
      dispatch(serviceGetSetVocas(user.id));
    }
  }, [user.id]);
  return (
    <MyVocasLayout
      handleOnRemoveSetVocaById={handleOnRemoveSetVocaById}
      handleOnSubmitModal={handleOnSubmitModal}
    />
  );
}

export default withPrivateLayout(MySetVocas, {
  title: "Study Room - Create more vocabularies",
});
