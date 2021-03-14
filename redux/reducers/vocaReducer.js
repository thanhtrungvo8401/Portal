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
      let voca;
      let vocaId;
      list = [...payload];
      listEditing = list.map((el) => false);
      return {
        ...state,
        list: list,
        listEditing,
      };
    case VOCABULARY.SET_VOCA_OBJECT:
      voca = { ...payload };
      return {
        ...state,
        voca: voca,
      };
    case VOCABULARY.SET_VOCA_EDITING:
      voca = { ...payload };
      return {
        ...state,
        vocaEditing: voca,
      };
    case VOCABULARY.ADD_VOCA_TO_LIST:
      list = [...state.list];
      list.push(payload);
      listEditing = list.map((el) => el.false);
      return {
        ...state,
        list: list,
      };
    case VOCABULARY.REMOVE_VOCA_FROM_LIST:
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
        listEditing,
      };
    case VOCABULARY.SET_SHOW_CREATE_VOCA_FORM:
      listEditing = [...state.list].map((el) => false);
      listEditing.push(true);
      return {
        ...state,
        listEditing,
      };
    case VOCABULARY.SET_VOCA_EDITING_FOR_LIST:
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
