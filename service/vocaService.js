import { API } from "../api/Api";
import { toast } from "../components/Toast";
import { actionSetError } from "../redux/actions/errorActions";
import {
  actionAddVocabularyToList,
  actionRemoveVocabularyFromList,
  actionSetIsShowVocaModal,
  actionSetVocabularyList,
  actionUpdateVocaInList,
} from "../redux/actions/vocaActions";
import { enpoint_voca } from "../utils/API_URL";
import { appUrl } from "../utils/APP_URL";
import { codeToMessages, constCODE } from "../utils/CodeToMessages";
import { handleErrorAPI, navigate } from "../utils/Helper";

export const serviceFetVocaBySetId = (setId, actionAfterCallApi) => {
  return (dispatch) => {
    API.get(enpoint_voca.fetVocas(setId))
      .then((res) => {
        dispatch(actionSetVocabularyList(res.data));
        // ignore it if you dont need to execute anything after call api
        if (actionAfterCallApi) actionAfterCallApi();
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        const status = object.status;
        if (status === 404) {
          navigate(appUrl.dashboard().url);
        }
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceFetVocaRandomByLevel = (level) => {
  return API.get(enpoint_voca.fetVocasRandom(level))
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      handleErrorAPI(err, "toast");
    });
};

export const serviceCreateVoca = (voca) => {
  return (dispatch) => {
    API.post(enpoint_voca.create(), voca)
      .then((res) => {
        const voca = res.data;
        dispatch(actionAddVocabularyToList(voca));
        dispatch(actionSetIsShowVocaModal(false));
        toast.success(codeToMessages(constCODE.CREATE_VOCA_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceUpdateVoca = (voca) => {
  return (dispatch) => {
    API.put(enpoint_voca.update(voca.id), voca)
      .then((res) => {
        dispatch(actionUpdateVocaInList(res.data));
        dispatch(actionSetIsShowVocaModal(false));
        toast.success(codeToMessages(constCODE.UPDATE_VOCA_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceDeleteVocaById = (id) => {
  return (dispatch) => {
    API.delete(enpoint_voca.delete(id))
      .then((res) => {
        dispatch(actionRemoveVocabularyFromList(id));
        toast.success(codeToMessages(constCODE.DELETE_VOCA_SUCCESS));
      })
      .catch((err) => {
        const object = handleErrorAPI(err, "toast");
        dispatch(actionSetError(object.errorCodesObject));
      });
  };
};

export const serviceGetVocasByCodes = (codes = "") => {
  return (dispatch) => {
    API.get(enpoint_voca.getByCodes(), {
      params: {
        filters: {
          code: `in<!>${codes}`,
        },
        limit: 1000,
      },
    })
      .then((res) => {
        dispatch(actionSetVocabularyList(res.data.list));
      })
      .catch((err) => {
        console.log(err);
        handleErrorAPI(err, "toast");
      });
  };
};


export const serviceGetVocasByTestGroup = () => {
  return dispatch => {
    API.get(enpoint_voca.getByTestGroup())
      .then(res => {
        dispatch(actionSetVocabularyList(res.data))
      })
      .catch(err => {
        console.log(err);
        handleErrorAPI(err, "toast");
      })
  }
}