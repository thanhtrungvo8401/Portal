export const enpoint_auth = {
  sign_up: () => "/students",
  login: () => "/authenticate/login",
  logout: () => "/authenticate/logout",
};

export const enpoint_setVoca = {
  createSetVocas: () => "/set-vocas",
  getSetVocasByAuthId: (authId) => `/users/${authId}/set-vocas`,
  deleteById: (id) => `/set-vocas/${id}`,
};

export const enpoint_user = {
  getProfile: () => "/my-profile",
};
