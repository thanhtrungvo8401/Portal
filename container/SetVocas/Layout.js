import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ActionGroup from "../../components/ActionGroup";
import ParagraphTitle from "../../components/ParagraphTitle";
import VocaModal from "./VocaModal";
import BreadcrumbsCustom from "../../components/Breadcrumbs/Breadcrumbs";
import VocaDisplayGroup from "../../components/VocaDisplay/VocaDisplayGroup";
import { actionSetIsShowVocaModal } from "../../redux/actions/vocaActions";
import theme from "../../components/theme";
import PageTitle from "../../components/PageComponent/PageTitle";
import HomeIcon from "@material-ui/icons/Home";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import { appUrl } from "../../utils/APP_URL";
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

function Layout({
  handleOnChangeVoca,
  handleOnSubmitVocaModal,
  handleOnRemoveVocaById,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [deleteVocaId, setDeleteVocaId] = useState();
  return (
    <React.Fragment>
      <BreadcrumbsCustom
        parents={[
          {
            Icon: HomeIcon,
            label: "Study room",
            url: appUrl.studyRoom(),
          },
          { Icon: FiberNewIcon, label: "Tạo thêm từ", url: appUrl.myVoca() },
        ]}
        label="Danh sach tu vung"
      />
      <PageTitle>Vocabularies list</PageTitle>
      <Container>
        {/* Instruction */}
        <ParagraphTitle>Instruction</ParagraphTitle>
        <Container>
          <Typography color="textSecondary" variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          </Typography>
        </Container>
        {/* Vocabularies list */}
        <ParagraphTitle>Your vocabularies</ParagraphTitle>
        <Container>
          <div className={classes.setVocas}>
            <VocaDisplayGroup onSelectVocaIdToDelete={setDeleteVocaId} />
          </div>
        </Container>
        {/* Action Group */}
        <ActionGroup>
          <Button
            color="primary"
            variant="contained"
            onClick={() => dispatch(actionSetIsShowVocaModal(true))}
          >
            Create (+)
          </Button>
        </ActionGroup>
      </Container>
      {/* VocaModal: Create, update voca */}
      <VocaModal
        handleOnChange={handleOnChangeVoca}
        handleOnSubmit={handleOnSubmitVocaModal}
      />
      {/* Confirm Delete Popup */}
      <Dialog
        open={Boolean(deleteVocaId)}
        aria-labelledby="form-dialog-title"
        onClose={() => setDeleteVocaId(null)}
      >
        <DialogTitle id="form-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>Are you sure want to remove this voca!</DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => setDeleteVocaId(null)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleOnRemoveVocaById(deleteVocaId);
              setDeleteVocaId(null);
            }}
            style={{ color: theme.palette.error.main }}
            size="small"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Layout;
