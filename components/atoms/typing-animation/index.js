import { Box, makeStyles } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = ({ jumpHeight, spacing }) =>
  makeStyles((theme) => ({
    TypingDot: {
      animation: `$listeningAnimation 0.8s ${theme.transitions.easing.easeInOut} infinite`,
      marginLeft: spacing,
    },
    "@keyframes listeningAnimation": {
      "0%": {
        transform: `translateY(-${jumpHeight})`,
      },
      "50%": {
        transform: "translateY(0)",
      },
      "100%": {
        transform: `translateY(-${jumpHeight})`,
      },
    },
  }));

export default function TypingAnimation({ size, jumpHeight, spacing, isActive }) {
  const classes = useStyles({ jumpHeight, spacing })();
  if (!isActive) return null;
  return (
    <Box component="div">
      {[0, 0.05, 0.1].map((el) => {
        return (
          <FiberManualRecordIcon
            className={classes.TypingDot}
            style={{ animationDelay: `${el}s`, fontSize: size }}
            color="primary"
            key={el}
          />
        );
      })}
    </Box>
  );
}
