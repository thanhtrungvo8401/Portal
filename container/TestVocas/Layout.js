import { Typography } from "@material-ui/core";
import MultiTabStudy from "../../components/MultiTabStudy/MultiTabStudy";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphBody from "../../components/ParagraphBody";
import ParagraphTitle from "../../components/ParagraphTitle";

function TestVocasLayout(props) {
  return (
    <div className="remember-vocas-layout">
      <MultiTabStudy />
      <PageTitle>Let's create and check your memories</PageTitle>
      <ParagraphTitle>Instruction</ParagraphTitle>
      <ParagraphBody>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        </Typography>
      </ParagraphBody>
      <ParagraphTitle>Learning vocabularies group</ParagraphTitle>
      <ParagraphBody>STUDY</ParagraphBody>
    </div>
  );
}

export default TestVocasLayout;
