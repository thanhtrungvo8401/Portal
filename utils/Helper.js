import { actionSetHistory } from "../redux/actions/historyActions";
import { initializeStore, useStore } from "../redux/store";

export const navigate = (url) => {
  const store = initializeStore();
  store.dispatch(actionSetHistory(url));
};
