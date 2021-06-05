import { VOCABULARY } from "../types";

const initState = {
  list: [],
  voca: {},
  isShowVocaModal: false,
};

export const vocaReducer = (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case VOCABULARY.SET_LIST:
      return {
        ...state,
        list: payload,
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
    case VOCABULARY.ADD_VOCA_TO_LIST:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case VOCABULARY.REMOVE_VOCA_FROM_LIST:
      return {
        ...state,
        list: [...state.list].filter((el) => el.id !== payload),
      };
    case VOCABULARY.SET_IS_SHOW_VOCA_MODAL:
      return {
        ...state,
        isShowVocaModal: payload,
      };
    default:
      return state;
  }
};
