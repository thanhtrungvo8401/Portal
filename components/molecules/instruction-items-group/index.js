import { makeStyles, Typography } from "@material-ui/core"
import BodyContainer from "components/atoms/body-container";
import TitleBody from "components/atoms/title-body";
import InstructionItem from "components/atoms/instruction-item";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { theme } from "components/theme";
import { relativeTimeRounding } from "moment";
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    "& .list-instruction": {},
    "& .load-more": {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(2),
      "& .MuiTypography-root": {
        fontWeight: "bolder",
        cursor: "pointer",
        position: "relative",
        "& .icon": {
          position: "absolute",
          fontSize: '1rem',
          top: `-${theme.spacing(2)}px`,
          color: theme.palette.text.secondary,
          left: "50%",
          transform: 'translateX(-50%)'
        }
      }
    }
  }
}))

/**
 * listInstructions = [{text, imageUrl, alt}]
 */

export default function InstructionItemsGroup({ title, listInstructions }) {
  const classes = useStyles();
  return <BodyContainer>
    <div className={classes.root}>
      <TitleBody>{title}</TitleBody>
      <div className="list-instruction" >
        {listInstructions.map((el, index) => {
          return <InstructionItem
            key={index}
            text={el.text}
            textBold={el.textBold}
            imageUrl={el.imageUrl}
            alt={el.alt}
          />
        })}
      </div>
      <div className="load-more" >
        <Typography component="span" varient="body1" color="textSecondary" style={{ marginRight: theme.spacing(2) }} >
          <ExpandMoreIcon class="icon" />
          Thêm
        </Typography>
        <Typography component="span" varient="body1" color="textSecondary" >
          <ExpandLessIcon class="icon" />
          Đóng
        </Typography>
      </div>
    </div>
  </BodyContainer>
}