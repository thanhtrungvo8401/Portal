const codeToMessagesObject = {
  INVALID_FIELD: "This value is invalid!Please retry again!",
  NOT_NULL: "This field is required!",
  PASSWORD_NOT_MATCH: "Confirm password is not match!",
};

export const constCODE = {
  NOT_NULL: "NOT_NULL",
  PASSWORD_NOT_MATCH: "PASSWORD_NOT_MATCH",
  INVALID_FIELD: "INVALID_FIELD",
};

export const codeToMessages = (code) => {
  const message =
    codeToMessagesObject[code] || codeToMessagesObject[constCODE.NOT_NULL];
  return message;
};
