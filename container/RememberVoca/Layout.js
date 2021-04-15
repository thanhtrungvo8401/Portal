import { Button, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ActionGroup from "../../components/ActionGroup";
import CreateRememberGroup from "../../components/CreateRememberGroup/CreateRemember";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphTitle from "../../components/ParagraphTitle";
import { actionSetIsCreating } from "../../redux/actions/rememberGroupAction";
import HomeIcon from "@material-ui/icons/Home";
import { appUrl } from "../../utils/APP_URL";
import BreadcrumbsCustom from "../../components/Breadcrumbs/Breadcrumbs";
import ParagraphBody from "../../components/ParagraphBody/ParagraphBody";

function RememberVocasLayout(props) {
  const listRememberGroups = [];

  const { isCreating } = useSelector((state) => state.rememberGroup);
  const dispatch = useDispatch();
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
      <ParagraphTitle hidden={isCreating}>Instruction</ParagraphTitle>
      <Container hidden={isCreating}>
        <ParagraphBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        </ParagraphBody>
      </Container>
      {/* main */}
      <ParagraphTitle hidden={isCreating}>
        Learning vocabularies group
      </ParagraphTitle>
      <Container hidden={isCreating}>
        {!listRememberGroups.length && (
          <ParagraphBody>
            There are no remembers-group, Click into the following (+) Icon to
            create a new one!
          </ParagraphBody>
        )}
      </Container>
      {/* create new remember-group */}
      <CreateRememberGroup />
      {/* action */}
      <ActionGroup>
        {!isCreating && (
          <Button
            hidden={true}
            color="primary"
            variant="contained"
            onClick={() => dispatch(actionSetIsCreating(true))}
          >
            Create (+)
          </Button>
        )}
      </ActionGroup>
    </div>
  );
}

export default RememberVocasLayout;
