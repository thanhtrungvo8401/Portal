import {
  ADD_VOCABULARY_INTO_LIST,
  REMOVE_VOCABULARY_FROM_LIST,
  SET_VOCABULARY_LIST,
  SET_VOCABULARY_OBJECT,
} from "../types";

export const actionSetVocabularyList = (payload) => {
  return {
    type: SET_VOCABULARY_LIST,
    payload,
  };
};

export const actionSetVocabularyObject = (payload) => {
  return {
    type: SET_VOCABULARY_OBJECT,
    payload,
  };
};

export const actionAddVocabularyToList = (payload) => {
  return {
    type: ADD_VOCABULARY_INTO_LIST,
    payload,
  };
};

export const actionRemoveVocabularyFromList = (payload) => {
  return {
    type: REMOVE_VOCABULARY_FROM_LIST,
    payload,
  };
};
