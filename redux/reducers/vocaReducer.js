import {
  ADD_VOCABULARY_INTO_LIST,
  REMOVE_VOCABULARY_FROM_LIST,
  SET_SHOW_CREATE_VOCABULARY_FORM,
  SET_VOCABULARY_LIST,
  SET_VOCABULARY_OBJECT,
} from "../types";

const initState = {
  list: [],
  voca: {},
  showCreateForm: false,
};

export const vocaReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case SET_VOCABULARY_LIST:
      let list;
      let voca;
      list = [...action.payload];
      return {
        ...state,
        list: list,
      };
    case SET_VOCABULARY_OBJECT:
      voca = { ...action.payload };
      return {
        ...state,
        voca: voca,
      };
    case ADD_VOCABULARY_INTO_LIST:
      list = [...state.list];
      list.push(action.payload);
      return {
        ...state,
        list: list,
      };
    case REMOVE_VOCABULARY_FROM_LIST:
      list = [...state.list];
      voca = action.payload;
      let index = null;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.id === voca.id) {
          index = id;
        }
      }
      if (id !== null) {
        list.splice(index, 1);
      }
      return {
        ...state,
        list,
      };
    case SET_SHOW_CREATE_VOCABULARY_FORM:
      return {
        ...state,
        showCreateForm: action.payload,
      };
    default:
      return state;
  }
};
