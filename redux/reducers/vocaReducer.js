import {
  ADD_VOCABULARY_INTO_LIST,
  REMOVE_VOCABULARY_FROM_LIST,
  SET_SHOW_CREATE_VOCABULARY_FORM,
  SET_VOCABULARY_EDITING,
  SET_VOCABULARY_LIST,
  SET_VOCABULARY_LIST_EDITING_ITEM,
  RESET_VOCABULARY_LIST_EDITING,
  SET_VOCABULARY_OBJECT,
} from "../types";

const initState = {
  list: [],
  listEditing: [],
  voca: {},
  vocaEditing: {},
};

export const vocaReducer = (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case SET_VOCABULARY_LIST:
      let list;
      let listEditing;
      let voca;
      let vocaId;
      list = [...payload];
      listEditing = list.map((el) => false);
      return {
        ...state,
        list: list,
        listEditing,
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
      listEditing = list.map((el) => el.false);
      return {
        ...state,
        list: list,
      };
    case REMOVE_VOCABULARY_FROM_LIST:
      list = [...state.list];
      listEditing = [...state.listEditing];
      vocaId = payload;
      list.every((item, index) => {
        if (item.id === vocaId) {
          list.splice(index, 1);
          listEditing.splice(index, 1);
          return false;
        }
        return true;
      });
      return {
        ...state,
        list,
      };
    case SET_SHOW_CREATE_VOCABULARY_FORM:
      listEditing = [...state.list].map((el) => false);
      listEditing.push(true);
      return {
        ...state,
        listEditing,
      };
    case SET_VOCABULARY_LIST_EDITING_ITEM:
      list = state.list;
      listEditing = [...state.listEditing];
      vocaId = payload;
      list.forEach((item, index) => {
        if (item.id === vocaId) {
          listEditing[index] = true;
        } else {
          listEditing[index] = false;
        }
      });
      return {
        ...state,
        listEditing,
      };
    case RESET_VOCABULARY_LIST_EDITING:
      listEditing = state.list.map((el) => false);
      return {
        ...state,
        listEditing,
      };
    default:
      return state;
  }
};
