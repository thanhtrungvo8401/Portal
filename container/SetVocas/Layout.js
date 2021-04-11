import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionGroup from "../../components/ActionGroup";
import ParagraphTitle from "../../components/ParagraphTitle";
import Voca from "../../components/Voca";
import { actionSetShowCreateVocaForm } from "../../redux/actions/vocaActions";
import { listTabItem } from "../../components/MultiTabStudy/MultiTabStudy";
import BreadcrumbsCustom from "../../components/Breadcrumbs/Breadcrumbs";

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
  const listEditing = useSelector((state) => state.vocas).listEditing;
  const isShowCreateForm = listEditing[listVocas.length];
  const dispatch = useDispatch();
  // UI INTERACT:
  const handleOnShowCreateForm = () => {
    dispatch(actionSetShowCreateVocaForm());
  };
  return (
    <React.Fragment>
      <BreadcrumbsCustom {...listTabItem[2]} childLabel="Danh sach tu vung" />
      <ParagraphTitle>Instruction</ParagraphTitle>
      <Container>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        </Typography>
      </Container>

      <ParagraphTitle>Your vocabularies</ParagraphTitle>
      {Boolean(listVocas.length || isShowCreateForm) && (
        <Container>
          <div className={classes.setVocas}>
            {listVocas.map((voca, index) => {
              return (
                <Voca
                  key={index}
                  voca={voca}
                  ERROR={ERROR}
                  handleOnRemoveVocaById={props.handleOnRemoveVocaById}
                  isEditing={listEditing[index]}
                  handleOnChange={props.handleOnChangeUpdate}
                  handleOnSubmit={props.handleOnSubmitUpdate}
                />
              );
            })}
            {isShowCreateForm && (
              <Voca
                handleOnChange={props.handleOnChangeCreate}
                handleOnSubmit={props.handleOnSubmitCreate}
                voca={voca}
                ERROR={ERROR}
                isEditing={true}
              />
            )}
          </div>
        </Container>
      )}
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
