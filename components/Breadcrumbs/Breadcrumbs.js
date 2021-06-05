import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
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

export default function BreadcrumbsCustom({ label, parents = [] }) {
  const classes = useStyles();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {parents.map(({ Icon, label, url }, index) => {
        return (
          <MyLink url={url} key={index}>
            <Icon className={classes.icon} />
            <span className={classes.label}>{label}</span>
          </MyLink>
        );
      })}
      <Typography color="textSecondary">{label}</Typography>
    </Breadcrumbs>
  );
}
