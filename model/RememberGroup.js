import { CREATE_REMEMBER_TYPE, LEVEL } from "../utils/Constant";

export const createRememberObject = {
  type: CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET,
  level: LEVEL.N5,
  setVoca: {},
  vocas: [],
  step: 0,
  totalStep: 5,
};

export const rememberGroupModel = {
  vocaCodes: [],
  activeCodes: [],
  name: "",
  ownerId: "",
};
