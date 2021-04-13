import { Button, Container, Typography } from "@material-ui/core";
import ParagraphTitle from "../../components/ParagraphTitle";
import SetVoca from "../../components/SetVoca";
import ActionGroup from "../../components/ActionGroup";
import MultiTabStudy from "../../components/MultiTabStudy/MultiTabStudy";
import PageTitle from "../../components/PageComponent/PageTitle";
import { useDispatch, useSelector } from "react-redux";

// const inputFields = ["setName"];
// const inputTypes = {
//   setName: "input",
// };
// const inputLabels = {
//   setName: "Lesson XX: X X X X",
// };
// const inputRequired = ["setName"];

function MySetVocasLayout({ handleOnRemoveSetVocaById, handleOnSubmitModal }) {
  const { list } = useSelector((state) => state.setVocas);
  const dispatch = useDispatch();
  return (
    <div className="my-vocas-layout">
      <MultiTabStudy />
      <PageTitle>Create your own vocabularies in this page</PageTitle>
      <Container>
        {/* Instruction */}
        <ParagraphTitle>Instruction</ParagraphTitle>
        <Container>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          </Typography>
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
            return <SetVoca key={index} setVoca={el} />;
          })}
        </div>

        {/* Create new Set-Voca */}
        {!list.length && (
          <Typography variant="body1">
            There are no vocabularies group in your room, Click into the
            following (+) Icon to create a new one!
          </Typography>
        )}
      </Container>

      <ActionGroup>
        <Button
          color="primary"
          variant="contained"
          onClick={() => dispatch(actionSetIsShowSetVocaModal(true))}
        >
          Create (+)
        </Button>
      </ActionGroup>
    </div>
  );
}

export default MySetVocasLayout;
