import { Container, Typography } from "@material-ui/core";
import MultiTabStudy from "../../components/MultiTabStudy/MultiTabStudy";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphTitle from "../../components/ParagraphTitle";

function TestVocasLayout(props) {
  return (
    <div className="remember-vocas-layout">
      <MultiTabStudy />
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
