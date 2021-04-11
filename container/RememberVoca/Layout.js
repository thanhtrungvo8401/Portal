import { Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ActionGroup from "../../components/ActionGroup";
import CreateRememberGroup from "../../components/CreateRememberGroup/CreateRemember";
import MultiTabStudy from "../../components/MultiTabStudy/MultiTabStudy";
import PageTitle from "../../components/PageComponent/PageTitle";
import ParagraphTitle from "../../components/ParagraphTitle";
import { actionSetIsCreating } from "../../redux/actions/rememberGroupAction";

function RememberVocasLayout(props) {
  const listRememberGroups = [];

  const { isCreating } = useSelector((state) => state.rememberGroup);
  const dispatch = useDispatch();
  return (
    <div className="remember-vocas-layout">
      <MultiTabStudy />
      <PageTitle>Let's learn vocabularies</PageTitle>
      {/* intro */}
      <ParagraphTitle hidden={isCreating}>Instruction</ParagraphTitle>
      <Container hidden={isCreating}>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
        </Typography>
      </Container>
      {/* main */}
      <ParagraphTitle hidden={isCreating}>
        Learning vocabularies group
      </ParagraphTitle>
      <Container hidden={isCreating}>
        {!listRememberGroups.length && (
          <Typography>
            There are no remembers-group, Click into the following (+) Icon to
            create a new one!
          </Typography>
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
