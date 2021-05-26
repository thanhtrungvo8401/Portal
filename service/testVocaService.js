import { API } from "../api/Api"
import { enpoint_test_voca } from "../utils/API_URL"
import { COMMA, LEVEL, storageKey, UNDER_LINE } from "../utils/Constant"
import { handleErrorAPI } from "../utils/Helper";
import { storeClient } from "../redux/store"
import { actionSetIsShowModal, actionUpdateTestVoca } from "../redux/actions/testVocaActions";
import { localStorageHelper } from "../utils/storageHelper";
// HELPER FUNCTION
const extractDataFromAPI = nx => {
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
      ...extractDataFromAPI(apiData[getServerKey(clientKey)])
    }
  }
  return {
    number: apiData['number'],
    resources: resources,
    id: apiData.id
  }
}
// ---
const generateDataForAPI = object => {
  const prefix = object.active ? "1" : "0";
  const value = object.value.join(COMMA);
  return prefix + UNDER_LINE + value
}
const getTestGroupFromStore = (store) => {
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE));
  const testGroup = {
    id: store.id,
    number: store.number,
    ownerId: user.id
  };
  for (const clientKey in LEVEL) {
    testGroup[getServerKey(clientKey)] = generateDataForAPI(store.resources[clientKey]);
  }
  return testGroup;
}
// --- API ---
export const serviceGetTestVocaByOwnerId = (ownerId) => {
  return dispatch => {
    API.get(enpoint_test_voca.fetchTestVoca(ownerId))
      .then(res => {
        const { testVoca } = storeClient.getState();
        dispatch(actionUpdateTestVoca({
          ...testVoca,
          ...getStoreFromAPI(res.data, testVoca)
        }))
      })
      .catch(err => {
        console.log(err);
        handleErrorAPI(err, "toast");
      })
  }
}

export const serviceUpdateTestVoca = () => {
  const { testVoca } = storeClient.getState();
  const newTestVoca = getTestGroupFromStore(testVoca);
  return dispatch => {
    API.put(enpoint_test_voca.updateTestVoca(testVoca.id), newTestVoca)
      .then(res => {
        dispatch(actionSetIsShowModal(false));
      })
      .catch(err => {
        handleErrorAPI(err, "toast");
      })
  }
}