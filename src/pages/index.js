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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();
  const validateEmail = (inputEmail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(inputEmail);
  };

  const handleLogin = () => {
    if (email.trim() === "" || !validateEmail(email)) {
      setEmailError(true);
      return;
    }

    if (password.trim().length < 6) {
      setPasswordError(true);
      return;
    }

    const newObj = {
      email: email,
      password: password,
    };
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);


    // if login successful
    router.push("/notes");

  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Paper
        elevation={5}
        style={{ padding: "20px", width: 500, textAlign: "center" }}
      >
        <Typography variant="h5">Welcome to My Application</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Login
        </Typography>
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
          onClick={handleLogin}
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          Don't have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default LoginPage;
