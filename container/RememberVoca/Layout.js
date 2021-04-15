import { Button, Container } from "@material-ui/core";
import ActionGroup from "../../components/ActionGroup";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphTitle from "../../components/ParagraphTitle";
import HomeIcon from "@material-ui/icons/Home";
import { appUrl } from "../../utils/APP_URL";
import BreadcrumbsCustom from "../../components/Breadcrumbs/Breadcrumbs";
import ParagraphBody from "../../components/ParagraphBody/ParagraphBody";

function RememberVocasLayout(props) {
  const listRememberGroups = [];

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
        {!listRememberGroups.length && (
          <ParagraphBody>
            There are no remembers-group, Click into the following (+) Icon to
            create a new one!
          </ParagraphBody>
        )}
      </Container>
      {/* create new remember-group */}
      {/* action */}
      <ActionGroup>
        <Button
          hidden={true}
          color="primary"
          variant="contained"
          // onClick={() => dispatch(actionSetIsCreating(true))}
        >
          Create (+)
        </Button>
      </ActionGroup>
    </div>
  );
}

export default RememberVocasLayout;
