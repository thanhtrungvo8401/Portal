import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionGroup from "../../components/ActionGroup";
import ParagraphTitle from "../../components/ParagraphTitle";
import Voca from "../../components/Voca";
import { actionSetShowCreateVocaForm } from "../../redux/actions/vocaActions";

const useStyles = makeStyles((theme) => {
  return {
    setVocas: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "flex-start",
      [theme.breakpoints.up("md")]: {
        justifyContent: "space-between",
      },
    },
  };
});

function Layout(props) {
  const classes = useStyles();
  const { listVocas, voca, ERROR } = props;
  const isShowCreateForm = useSelector((state) => state.vocas.showCreateForm);
  const dispatch = useDispatch();
  console.log(voca, isShowCreateForm);
  // UI INTERACT:
  const handleOnShowCreateForm = () => {
    dispatch(actionSetShowCreateVocaForm(true));
  };
  return (
    <React.Fragment>
      <ParagraphTitle>A vocabulary example</ParagraphTitle>
      <Voca isExample={true} voca={{}} />

      <ParagraphTitle>Your vocabularies</ParagraphTitle>
      <div className={classes.setVocas}>
        {listVocas.map((el, index) => {
          return <Voca key={index} />;
        })}
        {isShowCreateForm && (
          <Voca
            handleOnChange={props.handleOnChangeCreate}
            handleOnSubmit={props.handleOnSubmitCreate}
            voca={voca}
            isEditing={true}
            ERROR={ERROR}
          />
        )}
      </div>
      <ActionGroup>
        {!isShowCreateForm && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleOnShowCreateForm}
          >
            Create (+)
          </Button>
        )}
      </ActionGroup>
    </React.Fragment>
  );
}

export default Layout;
