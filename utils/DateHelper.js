import moment from "moment-timezone";

export const formatDate = (dateString, isHaveTime) => {
  const date = moment(dateString);
  if (!date.isValid()) {
    return dateString;
  }
  const timeZone = "Asia/Ho_Chi_Minh";
  const formatStr = isHaveTime ? "DD MM YYYY HH:mm:ss" : "DD MM YYYY";

  return date.tz(timeZone).format(formatStr);
};
