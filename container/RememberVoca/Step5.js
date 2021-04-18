import { Typography } from "@material-ui/core";
import React from "react";
import VocaList from "../../components/VocaGroup/VocaList";
export default function Step5({ object, actionUpdate }) {
  const { vocas } = object;
  React.useEffect(() => {
    actionUpdate({ ...object, isRemoveStudiedVoca: true });
  }, []);
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
