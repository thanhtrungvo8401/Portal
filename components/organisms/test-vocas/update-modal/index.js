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
import { LEVEL, LEVEL_OPTION } from "utils/Constant";
import { theme } from "components/theme";
import { actionSetNumber, actionUpdateResources } from "redux/actions/testVocaActions";
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import { serviceUpdateTestVoca } from "service/testVocaService";


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
  const { list } = useSelector(state => state.setVocas);
  const MVOptions = list.map(el => el.id);
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

    if (!checked) {
      dispatch(actionUpdateResources({
        key: name,
        object: { ...resources[name], isSelectAll: checked, value: [] }
      }));
    } else {
      const value = name !== LEVEL.MV ? LEVEL_OPTION[name] : MVOptions;
      dispatch(actionUpdateResources({
        key: name,
        object: { ...resources[name], isSelectAll: checked, value }
      }));
    }
  }
  const handleUpdateTestVocas = () => {
    dispatch(serviceUpdateTestVoca())
  }
  return <Dialog open={isShowModal} style={{ zIndex: 500 }} keepMounted TransitionComponent={Transition} aria-labelledby="alert-dialog-slide-title">
    <DialogTitle id="alert-dialog-slide-title">
      Hộp kí ức
    </DialogTitle>
    <DialogContent>
      {/* NUMBER GROUP */}
      <Box>
        <TextField id="test-voca-number" type="number" color="primary" required
          name="number" value={number} label="Số lượng" variant="outlined"
          style={{ width: "100%" }} onChange={handleOnChangeNumberOfVocas}
        />
        <Typography variant="caption" color="textSecondary" style={{ fontStyle: "italic", display: "block" }} >
          (*) meomeo-kun sẽ chọn ngẫu nhiên {number} để kiểm tra kiến thức của bạn
        </Typography>
      </Box>
      {/* SELECT OPTIONS */}
      <Divider className={classes.Divider} />
      <FormGroup row>
        {Object.keys(resources).map(key => {
          return <FormControlLabel key={key} label={key !== LEVEL.MV ? key : "自分で"}
            control={
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} color="primary" name={key}
                checked={resources[key]["active"]} onChange={handleToggleActiveLevel} />} />
        })}
      </FormGroup>
      {/* SELECT FOR LEVEL */}
      <Divider className={classes.Divider} />
      <Box className={classes.List} >
        {Object.keys(resources).map(key => {
          const { active, value, isSelectAll } = resources[key];
          if (!active) return null;
          return <Card className="list-item" key={key}>
            <div className="avatar" >
              <Avatar style={{ backgroundColor: theme.palette.primary.main }} >
                {key === LEVEL.MV ? "自" : key}
              </Avatar>
            </div>

            <FormGroup className="action-group">
              <FormControlLabel value="bottom" label="Select all"
                control={<Checkbox checked={isSelectAll} onChange={handleSelectToggleCheckAll} color="primary" name={key} />}
              />

            </FormGroup>
            <div className="select-group" >
              <Autocomplete multiple id={"autocomplete_" + key} value={value} filterSelectedOptions
                options={key !== LEVEL.MV ? LEVEL_OPTION[key] : MVOptions}
                getOptionLabel={key !== LEVEL.MV ? ((option) => "B-" + option) : ((option) => list.find(el => el.id === option)?.setName)}
                renderInput={params => <TextField {...params} variant="outlined" label="" />}
                onChange={(e, values, reason) => handleOnChangeLessonForLevel(key, values)}
              />
            </div>
          </Card>
        })}
      </Box>
    </DialogContent>
    <DialogActions style={{ display: "flex", justifyContent: "center" }} >
      <Button disabled={!number} color="primary" variant="contained" onClick={handleUpdateTestVocas} >Đóng</Button>
    </DialogActions>
  </Dialog>
}