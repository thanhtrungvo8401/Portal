export const constantApp = {
  animationTime: 0.5,
  setVocaLimit: 10,
  timeout: 1000,
  timeOutUseEffect: 500,
  animationDuration: 500
};

export const constEnv = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENV,
};

export const constAuth = {
  JWT: "JWT_Meomeo-kun",
  REDIRECT_FROM: "redirectFrom",
  AUTHORIZATION: "Authorization",
  BEARER: "Bearer",
};

export const constantInfo = {
  email: "neko-kun@gmail.com",
};

export const storageKey = {
  MY_PROFILE: "MY_PROFILE",
  MY_JP_LEVEL: "MY_JP_LEVEL",
};

export const CREATE_REMEMBER_TYPE = {
  TYPE_OWN_SET: "TYPE_OWN_SET",
  TYPE_DEFAULT_CENTER_SET: "TYPE_DEFAULT_CENTER_SET",
};

export const LEVEL = {
  N5: "N5",
  N4: "N4",
  N3: "N3",
  N2: "N2",
  N1: "N1",
  MY_VOCA: "MY_VOCA"
};

export const ROLE_NAME = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  ASSISTANT: "ASSISTANT",
};

export const MAX_VOCA_IN_REMEMBER = 7;

export const VOCA_RANDOM_LIMIT = 30;
