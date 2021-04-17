import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../components/theme";
import { serviceFetVocaBySetId } from "../../service/vocaService";
import { CREATE_REMEMBER_TYPE } from "../../utils/Constant";

const step2Styles = makeStyles((theme) => ({
  root: {},
  vocasCover: {
    maxHeight: "18rem",
    overflowY: "scroll",
  },
}));

export default function Step3({ object, actionUpdate }) {
  const { type, level } = object;
  const isDefaultCenter = type === CREATE_REMEMBER_TYPE.TYPE_DEFAULT_CENTER_SET;
  const classes = step2Styles();
  return (
    <div className={classes.root}>
      {!isDefaultCenter && (
        <VocasFromYourOwnSet object={object} actionUpdate={actionUpdate} />
      )}
      {isDefaultCenter && (
        <Typography>Please choose one section in level: {level}</Typography>
      )}
    </div>
  );
}

function VocasFromYourOwnSet({ object, actionUpdate }) {
  const classes = step2Styles();
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
      <div className={classes.vocasCover}>
        <List>
          {vocas.map((el, index) => (
            <ListItem
              key={el.id}
              button
              divider={index !== vocas.length - 1}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                secondary={el.voca}
                style={{ width: "calc(50% - 0.5rem)", marginRight: "1rem" }}
              />
              <ListItemText
                secondary={el.meaning}
                style={{ width: "calc(50% - 0.5rem)" }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </React.Fragment>
  );
}
