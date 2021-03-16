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
      return {
        ...state,
        list: payload,
        listEditing: payload.map((el) => false),
      };
    case SET_VOCA.ADD__SET_VOCAS_TO_LIST:
      list = [...state.list];
      list.push(payload);
      listEditing = list.map((el) => false);
      return { ...state, list, listEditing };
    case SET_VOCA.REMOVE__SET_VOCAS_FROM_LIST:
      list = state.list.filter((el) => el.id != payload.id);
      listEditing = list.map((el) => false);
      return {
        ...state,
        list,
        listEditing,
      };
    case SET_VOCA.RESET__SET_VOCAS_LIST:
      return { ...state, list: [], listEditing: [] };
    case SET_VOCA.SET__SET_VOCAS_OBJECT:
      return {
        ...state,
        setVoca: { ...payload },
      };
    case SET_VOCA.SET__SET_VOCAS_EDITING_FOR_LIST:
      return {
        ...state,
        listEditing: state.list.map((el) =>
          el.id === payload.id ? true : false
        ),
      };
    case SET_VOCA.RESET__SET_VOCAS_LIST_EDITING:
      return {
        ...state,
        listEditing: state.list.map((el) => false),
      };
    case SET_VOCA.SET__SET_VOCAS_EDITING:
      return {
        ...state,
        setVocaEditing: payload,
      };
    case SET_VOCA.UPDATE_VALUE_SETVOCAS_AFTER_UPDATE:
      return {
        ...state,
        list: state.list.map((el) => (el.id === payload.id ? payload : el)),
      };
    default:
      return state;
  }
};
