import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import ParagraphTitle from "../../components/ParagraphTitle";
import SetVoca from "../../components/SetVoca";
import ActionGroup from "../../components/ActionGroup";
import PageTitle from "../../components/PageComponent/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { actionSetIsShowSetVocaModal } from "../../redux/actions/setVocasActions";
import SetVocaModal from "./SetVocaModal";
import { useState } from "react";
import theme from "../../components/theme";
import BreadcrumbsCustom from "../../components/Breadcrumbs/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import { appUrl } from "../../utils/APP_URL";
import ParagraphBody from "../../components/ParagraphBody/ParagraphBody";

function MySetVocasLayout({ handleOnRemoveSetVocaById, handleOnSubmitModal }) {
  const { list } = useSelector((state) => state.setVocas);
  const [deleteVocaId, setDeleteVocaId] = useState();
  const dispatch = useDispatch();
  return (
    <div className="my-vocas-layout">
      <BreadcrumbsCustom
        parents={[
          {
            Icon: HomeIcon,
            label: "Study room",
            url: `${appUrl.studyRoom()}?activeTab=1`,
          },
        ]}
        label="Danh sach nhom tu"
      />
      <PageTitle>Create your own vocabularies in this page</PageTitle>
      <Container>
        {/* Instruction */}
        <ParagraphTitle>Instruction</ParagraphTitle>
        <Container>
          <ParagraphBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          </ParagraphBody>
        </Container>

        {/* Vocabularies */}
        <ParagraphTitle>Your vocabularies groups</ParagraphTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {list.map((el, index) => {
            return (
              <SetVoca
                onSelectSetVocaIdToDelete={setDeleteVocaId}
                key={index}
                setVoca={el}
              />
            );
          })}
        </div>

        {/* Create new Set-Voca */}
        {!list.length && (
          <ParagraphBody>
            There are no vocabularies group in your room, Click into the
            following (+) Icon to create a new one!
          </ParagraphBody>
        )}
      </Container>
      <SetVocaModal handleOnSubmit={handleOnSubmitModal} />
      <ActionGroup>
        <Button
          color="primary"
          variant="contained"
          onClick={() => dispatch(actionSetIsShowSetVocaModal(true))}
        >
          Create (+)
        </Button>
      </ActionGroup>
      {/* Comfirm Delete SetVoca */}
      <Dialog
        open={Boolean(deleteVocaId)}
        aria-labelledby="form-dialog-title"
        onClose={() => setDeleteVocaId(null)}
      >
        <DialogTitle id="form-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent style={{ color: theme.palette.error.main }}>
          Are you sure want to delete this group, all vocabularies will be
          deleted too!
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={() => setDeleteVocaId(null)}>
            Cancel
          </Button>
          <Button
            size="small"
            onClick={() => {
              handleOnRemoveSetVocaById(deleteVocaId);
              setDeleteVocaId(null);
            }}
            style={{ color: theme.palette.error.main }}
            size="small"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MySetVocasLayout;
