import {
  ADD_GROUP_VOCAS_ITEM,
  REMOVE_GROUP_VOCAS_ITEM,
  RESET_GROUP_VOCAS_LIST,
  SET_GROUP_VOCAS_LIST,
  SET_VOCA_OBJECT,
} from "../types";
const initState = {
  list: [],
  setVoca: {},
};
export const setVocasReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case SET_GROUP_VOCAS_LIST:
      let list;
      state = { ...state, list: [...action.payload] };
      return state;
    case ADD_GROUP_VOCAS_ITEM:
      list = [...state.list];
      list.push(action.payload);
      return { ...state, list };
    case REMOVE_GROUP_VOCAS_ITEM:
      const item = action.payload || {};
      list = [...state.list];
      let indexItem = null;
      for (let i = 0; i < list.length; i++) {
        const el = list[i];
        if (el.id === item.id) {
          indexItem = i;
          break;
        }
      }
      if (indexItem !== null) {
        list.splice(indexItem, 1);
      }
      return { ...state, list };
    case RESET_GROUP_VOCAS_LIST:
      return { ...state, list: [] };
    case SET_VOCA_OBJECT:
      return {
        ...state,
        setVoca: { ...action.payload },
      };
    default:
      return state;
  }
};
