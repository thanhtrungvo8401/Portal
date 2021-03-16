import { SET_VOCA } from "../types";
const initState = {
  list: [],
  setVoca: {},
  listEditing: [],
  setVocaEditing: {},
};
export const setVocasReducer = (
  state = { ...initState },
  { type, payload }
) => {
  switch (type) {
    case SET_VOCA.GET__SET_VOCAS_LIST:
      let list;
      let listEditing;
      list = [...payload];
      listEditing = list.map((el) => false);
      return { ...state, list, listEditing };
    case SET_VOCA.ADD__SET_VOCAS_TO_LIST:
      list = [...state.list];
      list.push(payload);
      listEditing = list.map((el) => false);
      return { ...state, list, listEditing };
    case SET_VOCA.REMOVE__SET_VOCAS_FROM_LIST:
      const item = payload || {};
      list = [...state.list];
      listEditing = [...state.listEditing];
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === item.id) {
          list.splice(i, 1);
          listEditing.splice(i, 1);
          break;
        }
      }
      return { ...state, list, listEditing };
    case SET_VOCA.RESET__SET_VOCAS_LIST:
      return { ...state, list: [], listEditing: [] };
    case SET_VOCA.SET__SET_VOCAS_OBJECT:
      return {
        ...state,
        setVoca: { ...payload },
      };
    case SET_VOCA.SET__SET_VOCAS_EDITING_FOR_LIST:
      list = state.list;
      listEditing = [...state.listEditing];
      list.forEach((el, index) => {
        if (el.id === payload.id) {
          listEditing[index] = true;
        } else {
          listEditing[index] = false;
        }
      });
      return {
        ...state,
        list,
        listEditing,
      };
    case SET_VOCA.RESET__SET_VOCAS_LIST_EDITING:
      listEditing = state.list.map((el) => false);
      return {
        ...state,
        listEditing,
      };
    case SET_VOCA.SET__SET_VOCAS_EDITING:
      return {
        ...state,
        setVocaEditing: payload,
      };
    case SET_VOCA.UPDATE_VALUE_SETVOCAS_AFTER_UPDATE:
      list = state.list.map((el) => {
        if (el.id === payload.id) {
          return payload;
        } else return el;
      });
      return {
        ...state,
        list,
      };
    default:
      return state;
  }
};
