import { makeStyles, Typography } from "@material-ui/core"
import BodyContainer from "components/atoms/body-container";
import TitleBody from "components/atoms/title-body";
import InstructionItem from "components/atoms/instruction-item";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BgWhiteTransparent from "components/atoms/bg-white-transparent"
import { theme } from "components/theme";
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    "& .list-instruction": {
      "&.close-expand": {
        maxHeight: "10rem",
        overflow: "hidden",
        position: "relative"
      },
    },
    "& .load-more": {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(3),
      "& .MuiTypography-root": {
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

export default function InstructionItemsGroup({ title, listInstructions, isOpen, total, actionShowMore, actionClose }) {
  const classes = useStyles();
  const isShowMore = total > listInstructions.length || !isOpen;
  const isShowClose = isOpen;
  return <BodyContainer>
    <div className={`${classes.root}`} >
      <TitleBody>{title}</TitleBody>
      <div className={`list-instruction  ${!isOpen ? 'close-expand' : ''}`} >
        {listInstructions.map((el, index) => {
          return <InstructionItem
            key={index}
            text={el.text}
            textBold={el.textBold}
            imageUrl={el.imageUrl}
            alt={el.alt}
          />
        })}
        <BgWhiteTransparent isActive={!isOpen} />
      </div>
      <div className="load-more" >
        {isShowMore &&
          <Typography
            component="span" varient="body1" color="textSecondary" style={{ marginRight: theme.spacing(2) }}
            onClick={() => actionShowMore && actionShowMore()}
          >
            <ExpandMoreIcon class="icon" />Thêm
        </Typography>}
        {isShowClose &&
          <Typography
            component="span" varient="body1" color="textSecondary"
            onClick={() => actionClose && actionClose()}
          >
            <ExpandLessIcon class="icon" />Đóng
          </Typography>}
      </div>
    </div>
  </BodyContainer>
}