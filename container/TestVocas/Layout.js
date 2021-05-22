import { Container } from "@material-ui/core";
import BreadcrumbsCustom from "../../components/Breadcrumbs/Breadcrumbs";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphTitle from "../../components/ParagraphTitle";
import { appUrl } from "../../utils/APP_URL";
import HomeIcon from "@material-ui/icons/Home";
import ParagraphBody from "../../components/ParagraphBody/ParagraphBody";
import TestVocaBox from "../../components/TestVocaBox/TestVocaBox";

function TestVocasLayout(props) {
  return (
    <div className="remember-vocas-layout">
      <BreadcrumbsCustom
        parents={[
          {
            Icon: HomeIcon,
            label: "Study room",
            url: `${appUrl.studyRoom()}?activeTab=2`,
          },
        ]}
        label="Test-groups list"
      />
      <PageTitle>Let's create and check your memories</PageTitle>
      <ParagraphTitle>Instruction</ParagraphTitle>
      <Container>
        <ParagraphBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        </ParagraphBody>
      </Container>
      <ParagraphTitle>Learning vocabularies group</ParagraphTitle>
      {/* TEST VOCA BOX */}
      <TestVocaBox />
    </div>
  );
}

export default TestVocasLayout;
