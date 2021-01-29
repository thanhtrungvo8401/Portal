import { makeStyles } from "@material-ui/core";
import Voca from "../../components/Voca";

const useStyles = makeStyles((theme) => {
  return {
    setVocas: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      alignItems: "flex-start",
      [theme.breakpoints.up("md")]: {
        justifyContent: "space-between",
      },
    },
  };
});

function Layout(props) {
  const classes = useStyles();
  return (
    <div className={classes.setVocas}>
      <Voca />
      <Voca />
      <Voca />
    </div>
  );
}

export default Layout;
