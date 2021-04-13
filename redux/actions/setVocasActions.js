import { SET_VOCA } from "../types";

export const actionSet_SetVoca_List = (payload = []) => {
  return {
    type: SET_VOCA.SET_LIST,
    payload,
  };
};

export const actionAddSetVocaToList = (payload = {}) => {
  return {
    type: SET_VOCA.ADD__SET_VOCAS_TO_LIST,
    payload,
  };
};

export const actionUpdateSetVocaInList = (payload = {}) => ({
  type: SET_VOCA.UPDATE_SET_VOCAS_IN_LIST,
  payload,
});

export const actionRemoveSetVocaFromList = (payload = {}) => {
  return {
    type: SET_VOCA.REMOVE__SET_VOCAS_FROM_LIST,
    payload,
  };
};

export const actionSet_SetVocaObject = (payload = {}) => {
  return {
    type: SET_VOCA.SET__SET_VOCAS_OBJECT,
    payload: payload,
  };
};

export const actionSetIsShowSetVocaModal = (isShow = false) => ({
  type: SET_VOCA.SET_IS_SHOW_SET_VOCAS_MODAL,
  payload: isShow,
});
