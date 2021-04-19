import { BASE_API, BASE_API_COMMON } from "../api/Constant";

export const enpoint_auth = {
  sign_up: () => `${BASE_API_COMMON}/students`,
  login: () => `${BASE_API_COMMON}/authenticate/login`,
  logout: () => `${BASE_API_COMMON}/authenticate/logout`,
};

export const enpoint_setVoca = {
  createSetVocas: () => `${BASE_API_COMMON}/set-vocas`,
  updateSetVocas: (id) => `${BASE_API_COMMON}/set-vocas/${id}`,
  getSetVocasByAuthId: (authId) =>
    `${BASE_API_COMMON}/users/${authId}/set-vocas`,
  getSetVocasByCentersAndRoleName: () =>
    `${BASE_API_COMMON}/centers/roles/set-vocas`,
  getSetVocaDetailById: (id) => `${BASE_API_COMMON}/set-vocas/${id}`,
  deleteById: (id) => `${BASE_API_COMMON}/set-vocas/${id}`,
};

export const enpoint_voca = {
  fetVocas: (setId) => `${BASE_API_COMMON}/set-vocas/${setId}/vocas`,
  create: () => `${BASE_API_COMMON}/vocas`,
  update: (id) => `${BASE_API_COMMON}/vocas/${id}`,
  delete: (id) => `${BASE_API_COMMON}/vocas/${id}`,
};

export const enpoint_remember = {
  create: () => `${BASE_API_COMMON}/remember-groups`,
  fetRememberByOwnerId: (ownerId) =>
    `${BASE_API_COMMON}/owners/${ownerId}/remember-groups`,
  rememberWithId: (id) => `${BASE_API_COMMON}/remember-groups/${id}`,
};

export const enpoint_user = {
  getProfile: () => `${BASE_API_COMMON}/my-profile`,
};
