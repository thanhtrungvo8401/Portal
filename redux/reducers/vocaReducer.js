import { VOCABULARY } from "../types";

const initState = {
  list: [],
  listEditing: [],
  voca: {},
  vocaEditing: {},
};

export const vocaReducer = (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case VOCABULARY.SET_LIST:
      let list;
      let listEditing;
      return {
        ...state,
        list: payload,
        listEditing: payload.map((el) => false),
      };
    case VOCABULARY.UPDATE_VOCA_IN_LIST:
      return {
        ...state,
        list: state.list.map((el) => (el.id === payload.id ? payload : el)),
      };
    case VOCABULARY.SET_VOCA_OBJECT:
      return {
        ...state,
        voca: { ...payload },
      };
    case VOCABULARY.SET_VOCA_EDITING:
      return {
        ...state,
        vocaEditing: { ...payload },
      };
    case VOCABULARY.ADD_VOCA_TO_LIST:
      list = [...state.list];
      listEditing = [...state.listEditing];
      list.push(payload);
      listEditing.push(false);
      return {
        ...state,
        list,
        listEditing,
      };
    case VOCABULARY.REMOVE_VOCA_FROM_LIST:
      list = [...state.list].filter((el) => el.id !== payload);
      return {
        ...state,
        list,
        listEditing: list.map((el) => false),
      };
    case VOCABULARY.SET_SHOW_CREATE_VOCA_FORM:
      listEditing = state.list.map((el) => false);
      listEditing.push(true);
      return {
        ...state,
        listEditing,
      };
    case VOCABULARY.SET_VOCA_EDITING_FOR_LIST:
      return {
        ...state,
        listEditing: state.list.map((el) => (el.id === payload ? true : false)),
      };
    case VOCABULARY.RESET_LIST_EDITING:
      listEditing = state.list.map((el) => false);
      return {
        ...state,
        listEditing,
      };
    default:
      return state;
  }
};
