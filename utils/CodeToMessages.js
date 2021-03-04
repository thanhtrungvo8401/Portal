import { constantInfo } from "./Constant";

const codeToMessagesObject = {
  INVALID_FIELD: "This value is invalid!Please retry again!",
  NOT_NULL: "This field is required!",
  PASSWORD_NOT_MATCH: "Confirm password is not match!",
  SIGN_UP_SUCCESS:
    "Signup successfully! Please check your email and active your accout!",
  BAD_CREDENTIALS: "Login information was wrong! Please try again!",
  NOT_BLANK: "This field can not be blank string!",
  NOT_EMPTY: "Empty value is not allowed!",
  NOT_MAIL: `This value must be valid email, ex: ${constantInfo.email}`,
  UNIQUE_VALUE: "This value is already used!",
  NOT_EXIST_DATA: "The data you entered is not existed!",
  NOT_FOUND: "The data you want can not be found!",
  INTERNAL_SERVER_ERROR: "Something went wrong while executing your request",
  BAD_REQUEST: "The data you entered is not correct. Please retry!",
  METHOD_NOT_ALLOWED:
    "Your request was prohibited (It might break some constraints)!",
  ACCESS_DENIED:
    "You don't have permisstion to execute this actions!Please contact to admin for more infomation",
  NOT_DELETE_YOURSELF: "You are deleting yourself, It's prohibited",
  NOT_BELOW_8_LETTER: "Valid data must have length greater than 8!",
  INVALID_TOKEN: "You must login to access this resources!",
  OVER_RANGE_EXCEPTION: "Your SetVocas-Num is reached the limit, please contact the admin, or remove to create a new one!!!"
};

export const constCODE = {
  NOT_NULL: "NOT_NULL",
  PASSWORD_NOT_MATCH: "PASSWORD_NOT_MATCH",
  INVALID_FIELD: "INVALID_FIELD",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

export const codeToMessages = (code, isUsedForField) => {
  const defaultCode = Boolean(isUsedForField)
    ? constCODE.INVALID_FIELD
    : constCODE.INTERNAL_SERVER_ERROR;

  return codeToMessagesObject[code] || codeToMessagesObject[defaultCode];
};
