import React, { useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCreateUserMutation } from "./api/usersapi"; 
import { useDispatch } from "react-redux";
import { setUserEmail } from "./api/userSlice";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [createUser]= useCreateUserMutation();
  const validateEmail = (inputEmail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(inputEmail);
  };

  const handleSignup = async() => {
    if (firstName.trim() === "") {
      setFirstNameError(true);
      return;
    }

    if (lastName.trim() === "") {
      setLastNameError(true);
      return;
    }

    if (email.trim() === "" || !validateEmail(email)) {
      setEmailError(true);
      return;
    }

    if (password.trim().length < 6) {
      setPasswordError(true);
      return;
    }

    const newObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    const res = await createUser(newObj);
    dispatch(setUserEmail(email));
    if(res.data){
      //Here will call react toastify for success
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    
    router.push("/");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "97vh" }}
    >
      <Paper
        elevation={5}
        style={{ padding: "20px", width: 500, textAlign: "center" }}
      >
        <Typography variant="h5">Welcome to My Application</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Sign Up
        </Typography>
        <TextField
          required
          label="First Name"
          variant="filled"
          margin="normal"
          fullWidth
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setFirstNameError(false); 
          }}
          error={firstNameError}
          helperText={firstNameError ? "First Name is required" : ""}
        />
        <TextField
          required
          label="Last Name"
          variant="filled"
          margin="normal"
          fullWidth
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setLastNameError(false);
          }}
          error={lastNameError}
          helperText={lastNameError ? "Last Name is required" : ""}
        />
        <TextField
          required
          label="Email"
          variant="filled"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          error={emailError}
          helperText={emailError ? "Enter a valid email address" : ""}
        />
        <TextField
          required
          label="Password"
          type="password"
          variant="filled"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
          error={passwordError}
          helperText={
            passwordError ? "Password must be at least 6 characters" : ""
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          style={{ marginTop: "20px" }}
        >
          Signup
        </Button>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          Already have an account? <Link href="/">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
