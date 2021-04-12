import { VOCABULARY } from "../types";

export const actionSetVocabularyList = (vocaList) => {
  return {
    type: VOCABULARY.SET_LIST,
    payload: vocaList,
  };
};

export const actionSetVocabularyObject = (voca) => {
  return {
    type: VOCABULARY.SET_VOCA_OBJECT,
    payload: voca,
  };
};

export const actionAddVocabularyToList = (voca) => {
  return {
    type: VOCABULARY.ADD_VOCA_TO_LIST,
    payload: voca,
  };
};

export const actionUpdateVocaInList = (voca) => {
  return {
    type: VOCABULARY.UPDATE_VOCA_IN_LIST,
    payload: voca,
  };
};

export const actionRemoveVocabularyFromList = (vocaId) => {
  return {
    type: VOCABULARY.REMOVE_VOCA_FROM_LIST,
    payload: vocaId,
  };
};

export const actionSetIsShowVocaModal = (isShow = false) => {
  return {
    type: VOCABULARY.SET_IS_SHOW_VOCA_MODAL,
    payload: isShow,
  };
};
