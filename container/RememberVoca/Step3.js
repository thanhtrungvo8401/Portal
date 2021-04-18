import {
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../components/theme";
import VocaList from "../../components/VocaGroup/VocaList";
import { serviceGetCenterSetVocas } from "../../service/setVocaService";
import { serviceFetVocaBySetId } from "../../service/vocaService";
import {
  CREATE_REMEMBER_TYPE,
  ROLE_NAME,
  storageKey,
} from "../../utils/Constant";
import { localStorageHelper } from "../../utils/storageHelper";

const step3Styles = makeStyles((theme) => ({
  root: {},
}));

export default function Step3({ object, actionUpdate }) {
  const { type } = object;
  const isDefaultCenter = type === CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET;
  const classes = step3Styles();
  return (
    <div className={classes.root}>
      {!isDefaultCenter && (
        <VocasFromYourOwnSet object={object} actionUpdate={actionUpdate} />
      )}
      {isDefaultCenter && (
        <LessonFromYourLevel object={object} actionUpdate={actionUpdate} />
      )}
    </div>
  );
}

function VocasFromYourOwnSet({ object, actionUpdate }) {
  const dispatch = useDispatch();
  const { setVoca } = object;
  const vocas = useSelector((state) => state.vocas).list;
  useEffect(() => {
    if (setVoca.id) {
      dispatch(serviceFetVocaBySetId(setVoca.id));
    }
  }, [setVoca.id]);

  useEffect(() => {
    if (vocas.length) {
      actionUpdate({ ...object, vocas: vocas });
    }
  }, [vocas]);
  return (
    <React.Fragment>
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        These vocabularies will be added into your remember group
      </Typography>
      <VocaList vocas={vocas} />
    </React.Fragment>
  );
}

function LessonFromYourLevel({ object, actionUpdate }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { level } = object;
  const { list } = useSelector((state) => state.setVocas);

  useEffect(() => {
    actionUpdate({ ...object, isValidStep: false });
    if (user.center) {
      dispatch(
        serviceGetCenterSetVocas(
          user.center && user.center.id,
          ROLE_NAME.ASSISTANT,
          {
            filters: { setName: `like-start<!>${level}--Bai` },
            limit: 100,
            sortBy: "setName",
            order: "ASC",
          }
        )
      );
    }
  }, []);
  return (
    <React.Fragment>
      {/* Title Page */}
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        Please select the lesson that you want to learn from the following list
        ({level})
      </Typography>
      {/* Select Option */}
      <Autocomplete
        id="set-voca-from-default-select"
        getOptionLabel={(option) => option.setName}
        options={list}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Enter the lesson" variant="outlined" />
        )}
        onChange={(event, value, reason) => {
          actionUpdate({
            ...object,
            setVoca: value,
            isValidStep: Boolean(value),
          });
        }}
      ></Autocomplete>
    </React.Fragment>
  );
}
