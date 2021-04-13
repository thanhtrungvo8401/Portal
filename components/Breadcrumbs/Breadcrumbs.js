import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import { appUrl } from "../../utils/APP_URL";
import MyLink from "../../components/MyLink";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  label: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

export default function BreadcrumbsCustom(props) {
  const classes = useStyles();
  const { Icon, label, url, childLabel } = props;
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <MyLink color="inherit" url={appUrl.studyRoom()}>
        <HomeIcon className={classes.icon} />
        <span className={classes.label}>Phòng học</span>
      </MyLink>
      <MyLink color="inherit" url={url}>
        <Icon className={classes.icon} />
        <span className={classes.label}>{label}</span>
      </MyLink>
      <Typography color="textSecondary" className={classes.link}>
        {childLabel}
      </Typography>
    </Breadcrumbs>
  );
}
