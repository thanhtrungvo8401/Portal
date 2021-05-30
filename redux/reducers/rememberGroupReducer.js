import { REMEMBER_GROUP } from "../types";
const initState = {
  list: [],
  total: 0,
  rememberGroup: {},
  isShowCreateModal: false,
  isShowUpdateModal: false,
};

export const rememberGroupReducer = (
  state = { ...initState },
  { type, payload }
) => {
  switch (type) {
    case REMEMBER_GROUP.SET_LIST:
      return {
        ...state,
        list: payload.list,
        total: payload.total,
      };
    case REMEMBER_GROUP.ADD_REMEMBER_INTO_LIST:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case REMEMBER_GROUP.UPDATE_REMEMBER_IN_LIST:
      return {
        ...state,
        list: state.list.map((el) => (el.id === payload.id ? payload : el)),
      };
    case REMEMBER_GROUP.REMOVE_REMEMBER_FROM_LIST:
      return {
        ...state,
        list: state.list.filter((el) => el.id !== payload.id),
      };
    case REMEMBER_GROUP.SET_REMEMBER_GROUP:
      return {
        ...state,
        rememberGroup: payload,
      };
    case REMEMBER_GROUP.SET_IS_SHOW_CREATE_MODAL:
      return {
        ...state,
        isShowCreateModal: payload,
      };
    case REMEMBER_GROUP.SET_IS_SHOW_UPDATE_MODAL:
      return {
        ...state,
        isShowUpdateModal: payload,
      };
    default:
      return state;
  }
};
