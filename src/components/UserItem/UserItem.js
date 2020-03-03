import React, { useState, useEffect } from "react";

import "./../../App.css";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    fontWeight: "bold",
    "&:hover": {
      cursor: "grab"
    }
  },
  inline: {
    display: "inline",

    [theme.breakpoints.down(768)]: {
      display: "none"
    }
  },
  selected: {
    backgroundColor: "#1b68b3!important",
    color: theme.palette.background.paper
  }
}));

export default function UserItem({
  usersList,
  onChangeSelect,
  defaultSelectedValue,
  submittedValue
}) {
  const classes = useStyles();
  const [selectedOption, setSelect] = useState("");

  useEffect(() => {
    if (submittedValue) {
      setSelect("");
      onChangeSelect("");
    }
  }, [submittedValue, onChangeSelect, setSelect]);
  const setSelectedListItems = val => {
    if (val === selectedOption) {
      setSelect("");
      onChangeSelect("");
    } else {
      setSelect(val);
      onChangeSelect(val);
    }
  };

  const isSelected = e => {
    return selectedOption.includes(e) || defaultSelectedValue.includes(e);
  };
  return (
    <List className={classes.root}>
      {usersList.map(user => (
        <ListItem
          alignItems="flex-start"
          key={user.id}
          classes={{ selected: classes.selected }}
          selected={isSelected(user.id)}
          onClick={() => setSelectedListItems(user.id)}
        >
          <ListItemAvatar>
            <Avatar alt={user.name} src={user.photo} />
          </ListItemAvatar>

          <ListItemText
            className={classes.inline}
            primary={user.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                  className={selectedOption === user.id ? "selected-item" : ""}
                >
                  {user.email}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
