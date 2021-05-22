import {
  Avatar,
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  makeStyles,
  Slide,
  TextField,
  Typography
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { LEVEL_OPTION } from "../../utils/Constant";
import { theme } from "../../components/theme";
import SelectAllIcon from '@material-ui/icons/SelectAll';
import { CheckBox } from "@material-ui/icons";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
  Divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  List: {
    "& .list-item": {
      marginBottom: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      "& .avatar": {},
      "& .action-group": {
        display: "block",
        marginLeft: theme.spacing(1),
        paddingLeft: theme.spacing(1)
      },
      "& .select-group": {
        width: "100%",
        marginTop: theme.spacing(1),
      }
    }
  }
}))

export default function TestVocaModal({ }) {
  const { isShowModal, number, resources } = useSelector(state => state.testVoca);
  const classes = useStyles();
  return <Dialog
    open={isShowModal}
    TransitionComponent={Transition}
    keepMounted
    aria-labelledby="alert-dialog-slide-title"
    style={{ zIndex: 500 }}
  >
    <DialogTitle id="alert-dialog-slide-title">
      Hộp kí ức
    </DialogTitle>
    <DialogContent>
      {/* NUMBER GROUP */}
      <Box>
        <TextField
          id="test-voca-number"
          type="number"
          color="primary"
          required
          name="number"
          value={number}
          label="Số lượng"
          variant="filled"
          style={{ width: "100%" }}
        />
        <Typography
          variant="caption"
          color="textSecondary"
          style={{
            fontStyle: "italic",
            display: "block"
          }}
        >
          (*) meomeo-kun sẽ chọn ngẫu nhiên {number} để kiểm tra kiến thức của bạn
      </Typography>
      </Box>
      {/* SELECT OPTIONS */}
      <Divider className={classes.Divider} />
      <FormGroup row>
        {Object.keys(resources).map(key => {
          return <FormControlLabel key={key}
            control={
              <Checkbox
                checked={resources[key]["active"]}
                name={key}
                onChange={() => { }}
                color="primary"
              />
            }
            label={key}
          />
        })}
      </FormGroup>
      {/* SELECT FOR LEVEL */}
      <Divider className={classes.Divider} />
      <Box className={classes.List} >
        {Object.keys(resources).map(key => {
          const { active, value } = resources[key];
          if (!active) return null;
          return <div
            className="list-item"
            key={key}
          >
            <div className="avatar" >
              <Avatar style={{ backgroundColor: theme.palette.primary.main }} >{key}</Avatar>
            </div>
            <div className="action-group">
              <FormControlLabel
                value="bottom"
                control={
                  <CheckBox
                    checked={true}
                    name={key}
                    onChange={() => { }}
                    color="primary"
                  />}
                label="Select all"
              />

            </div>
            <div className="select-group" >
              <Autocomplete
                multiple
                id={"autocomplete_" + key}
                options={LEVEL_OPTION[key]}
                getOptionLabel={option => option}
                filterSelectedOptions
                renderInput={params => {
                  return <TextField
                    {...params}
                    variant="outlined"
                    label="Danh sách đang rỗng"
                    placeholder=""
                  />
                }}
              />
            </div>
          </div>
        })}
      </Box>
    </DialogContent>
  </Dialog>
}