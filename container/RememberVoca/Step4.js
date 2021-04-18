import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import VocaGroup from "../../components/VocaGroup/VocaGroup";
import { serviceFetVocaBySetId } from "../../service/vocaService";

const step4Styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const not = (a, b) => a.filter((el) => b.indexOf(el) === -1);
const intersection = (a, b) => a.filter((el) => b.indexOf(el) !== -1);

export default function Step4({ object, actionUpdate }) {
  const classes = step4Styles();
  const dispatch = useDispatch();
  const { setVoca } = object;
  const appVocas = useSelector((state) => state.vocas.list);
  const ids = appVocas.map((voca) => voca.id);

  const [checked, setChecked] = React.useState([]);
  const [resources, setResources] = React.useState(ids.slice(7));
  const [remembers, setRemembers] = React.useState(ids.slice(0, 7));

  const resourcesChecked = intersection(checked, resources);
  const remembersChecked = intersection(checked, remembers);
  const handleCheckedRemembers = () => {
    setRemembers(remembers.concat(resourcesChecked));
    setResources(not(resources, resourcesChecked));
    setChecked(not(checked, resourcesChecked));
  };
  const handleCheckedResources = () => {
    setResources(resources.concat(remembersChecked));
    setRemembers(not(remembers, remembersChecked));
    setChecked(not(checked, resourcesChecked));
  };
  const handleToggle = (value) => () => {
    setChecked(
      !checked.includes(value)
        ? [...checked, value]
        : checked.filter((el) => el !== value)
    );
  };
  const getDetail = (id) => {
    const voca = appVocas.find((voca) => voca.id === id);
    return { voca: voca.voca, meaning: voca.meaning };
  };

  React.useEffect(() => {
    dispatch(serviceFetVocaBySetId(setVoca.id));
  }, []);
  React.useEffect(() => {
    actionUpdate({
      ...object,
      vocas: appVocas.filter((el) => remembers.includes(el.id)),
    });
  }, [remembers]);

  return (
    <div className={classes.root}>
      <VocaGroup
        title="Your remember group"
        getDetail={getDetail}
        activeList={checked}
        handleToggle={handleToggle}
        items={remembers}
        isActive={true}
      />
      <ButtonGroup disableElevation color="primary" variant="contained">
        <Button
          size="small"
          className={classes.button}
          onClick={handleCheckedRemembers}
          disabled={!resourcesChecked.length}
          aria-label="move selected right"
        >
          <span style={{ transform: "rotate(-90deg)" }}>&gt;</span>
        </Button>
        <Button
          size="small"
          className={classes.button}
          onClick={handleCheckedResources}
          disabled={!remembersChecked.length}
          aria-label="move selected left"
        >
          <span style={{ transform: "rotate(-90deg)" }}>&lt;</span>
        </Button>
      </ButtonGroup>
      <VocaGroup
        title={setVoca.setName}
        activeList={checked}
        handleToggle={handleToggle}
        items={resources}
        getDetail={getDetail}
      />
    </div>
  );
}
