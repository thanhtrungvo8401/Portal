import { REMEMBER_GROUP } from "../types";

export const actionSetRememberGroupsList = (
  payload = { list: [], total: 0 }
) => ({
  type: REMEMBER_GROUP.SET_LIST,
  payload,
});

export const actionAddRememberIntoList = (payload = {}) => ({
  type: REMEMBER_GROUP.ADD_REMEMBER_INTO_LIST,
  payload,
});

export const actionUpdateRememberInList = (payload = {}) => ({
  type: REMEMBER_GROUP.UPDATE_REMEMBER_IN_LIST,
  payload,
});

export const actionRemoveRememberFromList = (payload = {}) => ({
  type: REMEMBER_GROUP.REMOVE_REMEMBER_FROM_LIST,
  payload,
});

export const actionSetRememberGroup = (payload = {}) => ({
  type: REMEMBER_GROUP.SET_REMEMBER_GROUP,
  payload,
});

export const actionSetIshowCreateModal = (payload = false) => ({
  type: REMEMBER_GROUP.SET_IS_SHOW_CREATE_MODAL,
  payload,
});

export const actionSetIshowUpdateModal = (payload = false) => ({
  type: REMEMBER_GROUP.SET_IS_SHOW_UPDATE_MODAL,
  payload,
});
