import {
  ADD_VOCABULARY_INTO_LIST,
  REMOVE_VOCABULARY_FROM_LIST,
  SET_SHOW_CREATE_VOCABULARY_FORM,
  SET_VOCABULARY_LIST,
  SET_VOCABULARY_OBJECT,
} from "../types";

export const actionSetVocabularyList = (vocaList) => {
  return {
    type: SET_VOCABULARY_LIST,
    payload: vocaList
  };
};

export const actionSetVocabularyObject = (voca) => {
  return {
    type: SET_VOCABULARY_OBJECT,
    payload: voca
  };
};

export const actionAddVocabularyToList = (voca) => {
  return {
    type: ADD_VOCABULARY_INTO_LIST,
    payload: voca
  };
};

export const actionRemoveVocabularyFromList = (vocaId) => {
  return {
    type: REMOVE_VOCABULARY_FROM_LIST,
    payload: vocaId
  };
};

export const actionSetShowCreateVocaForm = (isShow) => {
  return {
    type: SET_SHOW_CREATE_VOCABULARY_FORM,
    payload: isShow
  };
};
