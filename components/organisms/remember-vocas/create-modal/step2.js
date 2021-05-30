import React from "react";
import { InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "components/theme";
import {
  CREATE_REMEMBER_TYPE,
  LEVEL,
  storageKey,
} from "utils/Constant";
import { localStorageHelper } from "utils/storageHelper";
import { serviceGetSetVocas } from "service/setVocaService";

export default function Step2({ object, actionUpdate }) {
  const isDefaultCenter =
    object.type === CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET;
  return <div>
    {!isDefaultCenter && <FromYourOwnVocas object={object} actionUpdate={actionUpdate} />}
    {isDefaultCenter && <FromDefaultVocas object={object} actionUpdate={actionUpdate} />}
  </div>
}

function FromYourOwnVocas({ object, actionUpdate }) {
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};
  const { list } = useSelector(state => state.setVocas);
  const dispatch = useDispatch();

  React.useEffect(() => {
    actionUpdate({ ...object, isValidStep: false });
    if (user.id) dispatch(serviceGetSetVocas(user.id));
  }, []);
  return <React.Fragment>
    <Typography variant="subtitle2" style={{ marginBottom: theme.spacing(1) }} >
      Chọn nhóm từ mà bạn muốn học
    </Typography>
    <Autocomplete
      id="set-voca-select"
      getOptionLabel={(option) => option.setName}
      options={list}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Enter the group's name"
          variant="outlined"
        />
      )}
      onChange={(event, value, reason) => {
        actionUpdate({
          ...object,
          setVoca: value,
          isValidStep: Boolean(value),
        });
      }}
    />
  </React.Fragment>
}

function FromDefaultVocas({ object, actionUpdate }) {
  const { level } = object;
  React.useEffect(() => {
    const LEVEL = localStorageHelper.get(storageKey.MY_JP_LEVEL);
    if (LEVEL) {
      actionUpdate({ ...object, isValidStep: true, level: LEVEL });
    } else {
      actionUpdate({ ...object, isValidStep: true });
    }
  }, []);
  return (
    <React.Fragment>
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        Chọn cấp học mà bạn muốn
      </Typography>
      <Select
        labelId="learn-vocas-from-level-label"
        id="learn-vocas-from-level-select"
        value={level}
        onChange={(event) => {
          actionUpdate({
            ...object,
            level: event.target.value,
          });
          localStorageHelper.set(storageKey.MY_JP_LEVEL, event.target.value);
        }}
        style={{ width: "100%" }}
        variant="outlined"
      >
        {Object.keys(LEVEL).map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
}
