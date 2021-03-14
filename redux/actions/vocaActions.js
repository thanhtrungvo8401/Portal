import {
  VOCABULARY,
} from "../types";

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

export const actionSetVocabularyEditing = (voca) => {
  return {
    type: VOCABULARY.SET_VOCA_EDITING,
    payload: voca,
  };
};

export const actionAddVocabularyToList = (voca) => {
  return {
    type: VOCABULARY.ADD_VOCA_TO_LIST,
    payload: voca,
  };
};

export const actionRemoveVocabularyFromList = (vocaId) => {
  return {
    type: VOCABULARY.REMOVE_VOCA_FROM_LIST,
    payload: vocaId,
  };
};

export const actionSetShowCreateVocaForm = () => {
  return {
    type: VOCABULARY.SET_SHOW_CREATE_VOCA_FORM,
  };
};

export const actionSetVocaListEditingItem = (vocaId) => {
  return {
    type: VOCABULARY.SET_VOCA_EDITING_FOR_LIST,
    payload: vocaId,
  };
};

export const actionResetVocaListEditing = () => {
  return {
    type: VOCABULARY.RESET_LIST_EDITING,
  };
};
