import {
  ADD_GROUP_VOCAS_ITEM,
  REMOVE_GROUP_VOCAS_ITEM,
  RESET_GROUP_VOCAS_LIST,
  SET_GROUP_VOCAS_LIST,
} from "../types";

export const setVocasReducer = (state = [], action) => {
  switch (action.type) {
    case SET_GROUP_VOCAS_LIST:
      state = [...action.payload];
      return state;
    case ADD_GROUP_VOCAS_ITEM:
      state.push(action.payload);
      return [...state];
    case REMOVE_GROUP_VOCAS_ITEM:
      const item = action.payload || {};
      let indexItem = null;
      for (let i = 0; i < state.length; i++) {
        const el = state[i];
        if (el.id === item.id) {
          indexItem = i;
          break;
        }
      }
      if (indexItem !== null) {
        state.splice(indexItem, 1);
      }
      return [...state];
    case RESET_GROUP_VOCAS_LIST:
      state = [];
      return state;
    default:
      return state;
  }
};
