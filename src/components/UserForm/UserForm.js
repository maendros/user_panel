import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./UserForm.css";
import { makeStyles, Button, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
const buttonStyles = makeStyles(() => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    color: "#fff",
    lineHeight: 1.5,
    backgroundColor: "#1b68b3",
    marginLeft: 2,

    "&:hover": {
      opacity: "0.8",
      boxShadow: "none",
      color:'#000'
    },
  }
}));

const ColorButton = withStyles(theme => ({
  root: {
    color: '#000',
    backgroundColor: '#f7f7f7',
    '&:hover': {
      backgroundColor: grey[700],
      color: '#f7f7f7',
    },
  },
}))(Button);

export default function UserForm({ user, onUserChange }) {
  const buttonClasses = buttonStyles();
  const { register, handleSubmit, formState, reset, errors } = useForm();
  const [isFormEdited, setIsFormEdited] = useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
    onUserChange(data);
    setIsFormEdited(false);
  };
  const resetState = () => {
    reset({ ...user });
    setIsFormEdited(false);
  };

  useEffect(() => {
    reset({ ...user });
  }, [user,reset]);
  
  useEffect(() => {
    setIsFormEdited(formState.dirty);
  }, [formState]);

  return (
    <form className="form-content" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        ref={register({ maxLength: 40 })}
        className="form-input"
        defaultValue={user.name}
        disabled={!user.id}
        maxLength="40"
        autoComplete="off"
        placeholder={user.id ? 'Enter a Name' : ''}
      />
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        name="email"
        ref={register({
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })}
        className="form-input"
        defaultValue={user.email}
        disabled={!user.id}
        maxLength="40"
        autoComplete="off"
        placeholder={user.id ? 'Enter an Email' : ''}
      />
      <div className="error-info"> {errors.email && errors.email.message}</div>
      <label htmlFor="phone">Phone</label>
      <input
        type="tel"
        name="phone"
        ref={register({ max: 25 })}
        className="form-input"
        defaultValue={user.phone}
        disabled={!user.id}
        maxLength="25"
        autoComplete="off"
        placeholder={user.id ? 'Enter an Phone' : ''}
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        name="address"
        ref={register({ max: 40 })}
        className="form-input"
        defaultValue={user.address}
        disabled={!user.id}
        maxLength="40"
        autoComplete="off"
        placeholder={user.id ? 'Enter an Address' : ''}
      />
      <label htmlFor="company">Company</label>
      <input
        type="text"
        name="company"
        ref={register({ max: 40 })}
        className="form-input"
        defaultValue={user.company}
        disabled={!user.id}
        maxLength="40"
        autoComplete="off"
        placeholder={user.id ? 'Enter a Company' : ''}
      />
      <div className="group-buttons">
        {isFormEdited && (
          <ColorButton
            variant="contained"
            className={buttonClasses.root}
            classes={buttonClasses.CancelBackground}
            type="reset"
            onClick={() => resetState()}
          >
            Cancel
          </ColorButton>
        )}
        <Button
          variant="contained"
          className={buttonClasses.root}
          type="submit"
          disabled={!isFormEdited}
        >
          Save
        </Button>
      </div>

    </form>
  );
}
