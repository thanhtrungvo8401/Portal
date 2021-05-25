import { TEST_VOCA } from "../types";

const initState = {
  isShowModal: false,
  number: 50,
  resources:
  {
    MV: { active: false, value: [], isSelectAll: false },
    N5: { active: true, value: [], isSelectAll: false },
    N4: { active: true, value: [], isSelectAll: false },
    N3: { active: false, value: [], isSelectAll: false },
    N2: { active: false, value: [], isSelectAll: false },
    N1: { active: false, value: [], isSelectAll: false },
  }
}

export const testVocaReducer = (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case TEST_VOCA.SET_IS_SHOW_MODAL:
      return {
        ...state,
        isShowModal: payload
      }
    case TEST_VOCA.SET_NUMBER:
      return {
        ...state,
        number: payload
      }
    case TEST_VOCA.UPDATE_RESOURCES:
      const { key, object } = payload;
      return {
        ...state,
        resources: {
          ...state.resources,
          [key]: object
        }
      }
    default:
      return state;
  }
}