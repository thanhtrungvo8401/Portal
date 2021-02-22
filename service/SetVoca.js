import { API } from "../api/Api"
import { enpoint_auth } from "./ApiUrl"

export const serviceCreateSetVoca = (setVoca) => {
  return (dispatch) => {
    API.post(enpoint_auth)
  }
}