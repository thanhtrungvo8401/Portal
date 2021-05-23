import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Slide,
  TextField,
  Typography
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { LEVEL_OPTION } from "../../utils/Constant";
import { theme } from "../../components/theme";
import { actionSetIsShowModal, actionSetNumber, actionUpdateResources } from "../../redux/actions/testVocaActions";
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';


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
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.main}`,
      marginBottom: theme.spacing(4),
      "&:last-child": {
        marginBottom: 0
      },
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isShowModal, number, resources } = useSelector(state => state.testVoca);
  const handleOnChangeNumberOfVocas = (e) => {
    const { value } = e.target;
    if (value === "") {
      dispatch(actionSetNumber(value));
    } else {
      dispatch(actionSetNumber(Math.abs(Math.round(value))))
    }
  }
  const handleToggleActiveLevel = (e) => {
    const { name, checked } = e.target;
    dispatch(actionUpdateResources({
      key: name,
      object: {
        ...resources[name],
        active: checked,
      }
    }))
  }
  const handleOnChangeLessonForLevel = (key, values) => {
    const newObject = values.length !== LEVEL_OPTION[key].length
      ? { ...resources[key], value: values, isSelectAll: false }
      : { ...resources[key], value: values, isSelectAll: true };
    dispatch(actionUpdateResources({ key, object: newObject }));
  }
  const handleSelectToggleCheckAll = (e) => {
    const { checked, name } = e.target;
    const newObject = checked
      ? { ...resources[name], isSelectAll: checked, value: LEVEL_OPTION[name] }
      : { ...resources[name], isSelectAll: checked, value: [] };
    dispatch(actionUpdateResources({ key: name, object: newObject }));
  }
  const handleCloseModal = () => {
    dispatch(actionSetIsShowModal(false));
  }
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
          variant="outlined"
          style={{ width: "100%" }}
          onChange={handleOnChangeNumberOfVocas}
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
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={resources[key]["active"]}
                name={key}
                onChange={handleToggleActiveLevel}
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
          const { active, value, isSelectAll } = resources[key];
          if (!active) return null;
          return <Card
            className="list-item"
            key={key}
          >
            <div className="avatar" >
              <Avatar style={{ backgroundColor: theme.palette.primary.main }} >
                {key === "MY_VOCA" ? "Me" : key}
              </Avatar>
            </div>
            <FormGroup className="action-group">
              <FormControlLabel
                value="bottom"
                control={
                  <Checkbox
                    checked={isSelectAll}
                    name={key}
                    onChange={handleSelectToggleCheckAll}
                    color="primary"
                  />
                }
                label="Select all"
              />

            </FormGroup>
            <div className="select-group" >
              <Autocomplete
                multiple
                id={"autocomplete_" + key}
                options={LEVEL_OPTION[key]}
                value={value}
                getOptionLabel={option => "B-" + option}
                filterSelectedOptions
                renderInput={params => {
                  return <TextField
                    {...params}
                    variant="outlined"
                    label="Danh sách đang rỗng"
                    placeholder=""
                  />
                }}
                onChange={(e, values, reason) => handleOnChangeLessonForLevel(key, values)}
              />
            </div>
          </Card>
        })}
      </Box>
    </DialogContent>
    <DialogActions style={{ display: "flex", justifyContent: "center" }} >
      <Button
        disabled={!number}
        color="primary"
        variant="contained"
        onClick={handleCloseModal}
      >Close</Button>
    </DialogActions>
  </Dialog>
}