import { TEST_VOCA } from "../types";

const initState = {
  isShowModal: false,
  number: 50,
  resources:
  {
    MY_VOCA: { active: false, value: [] },
    N5: { active: true, value: [] },
    N4: { active: true, value: [] },
    N3: { active: false, value: [] },
    N2: { active: false, value: [] },
    N1: { active: false, value: [] },
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
      const { key, value } = payload;
      return {
        ...state,
        resources: {
          ...state.resources,
          [key]: value
        }
      }
    default:
      return state;
  }
}