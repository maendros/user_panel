import React, { useState, useEffect } from "react";

import "./../../App.css";
import UserItem from "../UserItem/UserItem";
import UserForm from "../UserForm/UserForm";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import { findSelectedUser, updateUser } from "../../utilities/utilities";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "2% auto",
    backgroundColor: "#fff",
    boxShadow: 'none',
    [theme.breakpoints.up(769)]: {
      maxWidth: "50%",
      maxHeight: "53vh",
      boxShadow: "#787678 0px 0px 10px -4px;",
      margin: "4% auto",
    },

  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));
export default function UserPanel() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("./user_data.json");
      const data = await response.json();
      setUsers([...data.users]);
      setIsLoading(false);
    };
    fetchData();
  }, [isLoading]);

  const onSelectionOfUser = val => {
    setIsSubmit(false);
    setSelectedUser(findSelectedUser([...users], val));
  };

  const updateUsersState = userValue => {
    if (userValue) {
      setUsers(updateUser([...users], userValue, selectedUser.id));
    }

    setSelectedUser({});
    setIsSubmit(true);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={3} sm={6} className="list-content">
          {!isLoading && (
            <UserItem
              usersList={[...users]}
              defaultSelectedValue=""
              submittedValue={isSubmit}
              onChangeSelect={value => onSelectionOfUser(value)}
            />
          )}
        </Grid>

        <Grid item xs={9} sm={6}>
          <UserForm
            user={{ ...selectedUser }}
            onUserChange={updateUsersState}
          />
        </Grid>
      </Grid>
    </div>
  );
}
