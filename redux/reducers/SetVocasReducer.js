import {
  SET_VOCA,
} from "../types";
const initState = {
  list: [],
  setVoca: {},
};
export const setVocasReducer = (state = { ...initState }, action) => {
  switch (action.type) {
    case SET_VOCA.GET__SET_VOCAS_LIST:
      let list;
      state = { ...state, list: [...action.payload] };
      return state;
    case SET_VOCA.ADD__SET_VOCAS_TO_LIST:
      list = [...state.list];
      list.push(action.payload);
      return { ...state, list };
    case SET_VOCA.REMOVE__SET_VOCAS_FROM_LIST:
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
    case SET_VOCA.RESET__SET_VOCAS_LIST:
      return { ...state, list: [] };
    case SET_VOCA.SET__SET_VOCAS_OBJECT:
      return {
        ...state,
        setVoca: { ...action.payload },
      };
    default:
      return state;
  }
};
