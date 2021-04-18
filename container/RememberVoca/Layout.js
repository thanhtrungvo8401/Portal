import { Button, Container } from "@material-ui/core";
import ActionGroup from "../../components/ActionGroup";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphTitle from "../../components/ParagraphTitle";
import HomeIcon from "@material-ui/icons/Home";
import { appUrl } from "../../utils/APP_URL";
import BreadcrumbsCustom from "../../components/Breadcrumbs/Breadcrumbs";
import ParagraphBody from "../../components/ParagraphBody/ParagraphBody";
import CreateRememberGroupModal from "./CreateModal";
import { useDispatch, useSelector } from "react-redux";
import { actionSetIshowCreateModal } from "../../redux/actions/rememberGroupAction";
import { localStorageHelper } from "../../utils/storageHelper";
import { storageKey } from "../../utils/Constant";
import React from "react";
import { serviceGetRememberOfOwnerId } from "../../service/rememberService";

function RememberVocasLayout({ submitCreateRemember }) {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.rememberGroups);
  const user = JSON.parse(localStorageHelper.get(storageKey.MY_PROFILE)) || {};

  React.useEffect(() => {
    if (user.id) {
      dispatch(serviceGetRememberOfOwnerId(user.id));
    }
  }, [user.id]);
  return (
    <div className="remember-vocas-layout">
      <BreadcrumbsCustom
        parents={[
          {
            Icon: HomeIcon,
            label: "Study room",
            url: `${appUrl.studyRoom()}?activeTab=0`,
          },
        ]}
        label="Remember-groups list"
      />
      <PageTitle>Let's learn vocabularies</PageTitle>
      {/* intro */}
      <ParagraphTitle>Instruction</ParagraphTitle>
      <Container>
        <ParagraphBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        </ParagraphBody>
      </Container>
      {/* main */}
      <ParagraphTitle>Learning vocabularies group</ParagraphTitle>
      <Container>
        {!list.length && (
          <ParagraphBody>
            There are no remembers-group, Click into the following (+) Icon to
            create a new one!
          </ParagraphBody>
        )}
      </Container>
      {/* create new remember-group */}
      <CreateRememberGroupModal onSubmit={submitCreateRemember} />
      {/* action */}
      <ActionGroup>
        <Button
          hidden={true}
          color="primary"
          variant="contained"
          onClick={() => dispatch(actionSetIshowCreateModal(true))}
        >
          Create (+)
        </Button>
      </ActionGroup>
    </div>
  );
}

export default RememberVocasLayout;
