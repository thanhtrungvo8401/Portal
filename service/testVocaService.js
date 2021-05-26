import { API } from "../api/Api"
import { enpoint_test_voca } from "../utils/API_URL"
import { COMMA, LEVEL, UNDER_LINE } from "../utils/Constant"
import { handleErrorAPI } from "../utils/Helper";
import { storeClient } from "../redux/store"
import { actionUpdateTestVoca } from "../redux/actions/testVocaActions";
// HELPER FUNCTION
const extractDataLevel = nx => {
  const active = nx.split(UNDER_LINE)[0] === "1";
  const value = nx.split(UNDER_LINE)[1]
    ? nx.split(UNDER_LINE)[1].split(COMMA)
    : [];
  return { active, value };
}

const getServerKey = (key) => key !== LEVEL.MV ? key.toLowerCase() : "myVoca";

const getStoreFromAPI = (apiData, store) => {
  const resources = {};
  for (const clientKey in LEVEL) {
    resources[clientKey] = {
      ...store.resources[clientKey],
      ...extractDataLevel(apiData[getServerKey(clientKey)])
    }
  }
  return {
    number: apiData['number'],
    resources: resources
  }
}
// --- API ---
export const serviceGetTestVocaByOwnerId = (ownerId) => {
  return dispatch => {
    API.get(enpoint_test_voca.fetchTestVoca(ownerId))
      .then(res => {
        const testVoca = storeClient.getState().testVoca;
        dispatch(actionUpdateTestVoca({
          ...testVoca,
          ...getStoreFromAPI(res.data, testVoca)
        }))
      })
      .catch(err => {
        handleErrorAPI(err, "toast");
      })
  }
}