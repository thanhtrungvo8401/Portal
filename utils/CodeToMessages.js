const codeToMessagesObject = {
  INVALID_FIELD: "This value is invalid!Please retry again!",
  NOT_NULL: "This field is required!",
  PASSWORD_NOT_MATCH: "Confirm password is not match!",
  SIGN_UP_SUCCESS:
    "Signup successfully! Please check your email and active your accout!",
};

export const constCODE = {
  NOT_NULL: "NOT_NULL",
  PASSWORD_NOT_MATCH: "PASSWORD_NOT_MATCH",
  INVALID_FIELD: "INVALID_FIELD",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
};

export const codeToMessages = (code) => {
  const message =
    codeToMessagesObject[code] || codeToMessagesObject[constCODE.NOT_NULL];
  return message;
};
