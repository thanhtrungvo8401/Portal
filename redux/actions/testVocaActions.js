import { TEST_VOCA } from "../types";

export const actionSetNumber = (payload = 0) => ({
  type: TEST_VOCA.SET_NUMBER,
  payload
});

export const actionSetIsShowModal = (payload = true) => ({
  type: TEST_VOCA.SET_IS_SHOW_MODAL,
  payload
});

export const actionUpdateResources = (payload = {}) => ({
  type: TEST_VOCA.UPDATE_RESOURCES,
  payload
})