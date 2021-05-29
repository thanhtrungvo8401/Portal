import { Button, Container, makeStyles } from "@material-ui/core";
import React from "react";
import ParagraphBody from "../../components/ParagraphBody/ParagraphBody";
import ParagraphTitle from "../../components/ParagraphTitle";
import { appUrl } from "../../utils/APP_URL";
import { navigate } from "../../utils/Helper";

const useStyle = makeStyles((theme) => ({
  btnGroup: {
    marginBottom: "1rem",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "2rem",
    },
  },
}));

function Tab3({ hidden }) {
  const classes = useStyle();
  return (
    <div hidden={hidden}>
      <ParagraphTitle>Test Group</ParagraphTitle>
      <Container>
        <div
          className={classes.btnGroup}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => navigate(appUrl.testVoca().url)}
            variant="contained"
            color="primary"
          >
            Go to Your Vocabularies Test
          </Button>
        </div>
        <ParagraphBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultrices dignissim ipsum. Nam eget lorem ornare, elementum risus nec,
          hendrerit velit. Aenean gravida convallis metus, quis accumsan tellus
          rutrum et.
        </ParagraphBody>
        <ParagraphBody>
          Aliquam nec odio mollis, malesuada justo sed, condimentum justo. Donec
          cursus venenatis facilisis. Nulla quam lorem, tincidunt vitae
          dignissim sit amet, fringilla a mauris. Sed massa tellus, finibus at
          pharetra et, sollicitudin eget lorem. Ut vulputate, mi vel fringilla
          hendrerit, ipsum lectus vulputate dolor, vitae porta diam neque id
          arcu. Donec tincidunt dapibus neque, vitae lacinia justo eleifend nec.
          Nam at pellentesque eros. Donec eu velit ut diam tempus ultrices a in
          mi. Integer euismod accumsan tempus. Ut faucibus vel turpis vitae
          porttitor. Maecenas pulvinar sagittis justo ac aliquam. Sed non dolor
          quam.
        </ParagraphBody>
        <ParagraphBody>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Vestibulum quis ante sem. Nullam lectus
          ipsum, porttitor nec finibus sed, congue vel augue. Morbi pharetra
          massa non quam finibus dignissim. Sed purus mauris, convallis non
          dapibus in, egestas eget velit. Nulla vitae nisl vitae dui ornare
          aliquam id et mauris. Maecenas vitae efficitur ante, nec vestibulum
          mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Mauris lorem elit, auctor sit amet ultricies
          eget, scelerisque vel orci. Phasellus ut enim lobortis, imperdiet dui
          in, feugiat nibh. Etiam nisi lacus, convallis in diam non,
          sollicitudin auctor lorem.
        </ParagraphBody>
      </Container>
    </div>
  );
}

export default Tab3;
