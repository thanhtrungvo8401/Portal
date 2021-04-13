import { SET_VOCA } from "../types";
const initState = {
  list: [],
  setVoca: {},
  isShowModal: false,
};
export const setVocasReducer = (
  state = { ...initState },
  { type, payload }
) => {
  switch (type) {
    case SET_VOCA.SET_LIST:
      return {
        ...state,
        list: payload,
      };
    case SET_VOCA.ADD__SET_VOCAS_TO_LIST:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case SET_VOCA.UPDATE_SET_VOCAS_IN_LIST:
      return {
        ...state,
        list: state.list.map((el) => (el.id === payload.id ? payload : el)),
      };
    case SET_VOCA.REMOVE__SET_VOCAS_FROM_LIST:
      return {
        ...state,
        list: state.list.filter((el) => el.id !== payload.id),
      };
    case SET_VOCA.SET__SET_VOCAS_OBJECT:
      return {
        ...state,
        setVoca: payload,
      };
    case SET_VOCA.SET_IS_SHOW_SET_VOCAS_MODAL:
      return {
        ...state,
        isShowModal: payload,
      };
    default:
      return state;
  }
};
