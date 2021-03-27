import { Button, Typography } from "@material-ui/core";
import { useState } from "react";
import ActionGroup from "../../components/ActionGroup";
import MultiTabStudy from "../../components/MultiTabStudy/MultiTabStudy";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphBody from "../../components/ParagraphBody";
import ParagraphTitle from "../../components/ParagraphTitle";

function RememberVocasLayout(props) {
  const listRememberGroups = [];

  const [isShowCreateForm, setCreateForm] = useState(false);
  const isValidSubmit = false;
  const handleShowCreate = () => {
    setCreateForm(true);
  };
  const handleCloseCreate = () => {
    setCreateForm(false);
  };
  return (
    <div className="remember-vocas-layout">
      <MultiTabStudy />
      {/* intro */}
      <PageTitle>Let's learn vocabularies</PageTitle>
      <ParagraphTitle>Instruction</ParagraphTitle>
      <ParagraphBody>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        </Typography>
      </ParagraphBody>
      {/* main */}
      <ParagraphTitle>Learning vocabularies group</ParagraphTitle>
      <ParagraphBody>
        {!isShowCreateForm && !listRememberGroups.length && (
          <Typography>
            There are no remembers-group, Click into the following (+) Icon to
            create a new one!
          </Typography>
        )}
      </ParagraphBody>
      {/* action */}
      <ActionGroup>
        {isShowCreateForm && (
          <Button variant="contained" onClick={handleCloseCreate}>
            Cancle
          </Button>
        )}
        {isShowCreateForm && (
          <Button
            color="primary"
            variant="contained"
            onClick={props.handleOnSubmit}
            disabled={!isValidSubmit}
          >
            Save
          </Button>
        )}
        {!isShowCreateForm && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleShowCreate}
          >
            Create (+)
          </Button>
        )}
      </ActionGroup>
    </div>
  );
}

export default RememberVocasLayout;
