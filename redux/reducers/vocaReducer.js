import {
  ADD_VOCABULARY_INTO_LIST,
  REMOVE_VOCABULARY_FROM_LIST,
  SET_SHOW_CREATE_VOCABULARY_FORM,
  SET_VOCABULARY_EDITING,
  SET_VOCABULARY_LIST,
  SET_VOCABULARY_OBJECT,
} from "../types";

const initState = {
  list: [],
  voca: {},
  vocaEditing: {},
  showCreateForm: false,
};

export const vocaReducer = (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case SET_VOCABULARY_LIST:
      let list;
      let voca;
      list = [...payload];
      return {
        ...state,
        list: list,
      };
    case SET_VOCABULARY_OBJECT:
      voca = { ...payload };
      return {
        ...state,
        voca: voca,
      };
    case SET_VOCABULARY_EDITING:
      voca = { ...payload };
      return {
        ...state,
        vocaEditing: voca,
      };
    case ADD_VOCABULARY_INTO_LIST:
      list = [...state.list];
      list.push(payload);
      return {
        ...state,
        list: list,
      };
    case REMOVE_VOCABULARY_FROM_LIST:
      list = [...state.list];
      const vocaId = payload;
      let index = null;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.id === vocaId) {
          index = i;
          break;
        }
      }
      if (index !== null) {
        list.splice(index, 1);
      }
      return {
        ...state,
        list,
      };
    case SET_SHOW_CREATE_VOCABULARY_FORM:
      return {
        ...state,
        showCreateForm: payload,
      };
    default:
      return state;
  }
};
