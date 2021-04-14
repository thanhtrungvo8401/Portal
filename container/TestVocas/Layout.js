import { Container, Typography } from "@material-ui/core";
import BreadcrumbsCustom from "../../components/Breadcrumbs/Breadcrumbs";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphTitle from "../../components/ParagraphTitle";
import { appUrl } from "../../utils/APP_URL";
import HomeIcon from "@material-ui/icons/Home";

function TestVocasLayout(props) {
  return (
    <div className="remember-vocas-layout">
      <BreadcrumbsCustom
        parents={[
          {
            Icon: HomeIcon,
            label: "Study room",
            url: appUrl.studyRoom(),
          },
        ]}
        label="Test-groups list"
      />
      <PageTitle>Let's create and check your memories</PageTitle>
      <ParagraphTitle>Instruction</ParagraphTitle>
      <Container>
        <Typography color="textSecondary" variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        </Typography>
      </Container>
      <ParagraphTitle>Learning vocabularies group</ParagraphTitle>
      <Container>STUDY</Container>
    </div>
  );
}

export default TestVocasLayout;
