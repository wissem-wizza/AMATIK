// import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AMATIK_logo from "./AMATIK_logo.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useLoginUserMutation,
  useSignupUserMutation,
} from "../../features/auth/authApi";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <div style={{ textAlign: "center" }}>
        <img
          className="logo-img"
          src={AMATIK_logo}
          alt="amatik logo"
          style={{ height: "80px", width: "120px" }}
        />
      </div>
      {"Copyright © "}
      <Link color="inherit" href="#">
        Amatik
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [signupUser, { isLoading: isSignupLoading }] = useSignupUserMutation();

  // const { data: log, isLoading } = useLoginUserMutation();
  // if (isLoading) {
  //   return <p>eeeeeeeeeeeeeeeeeeeee</p>;
  // }
  // console.log("FFFFFFFFFFFFFFFFFFF", log);
  // console.log(loginUser);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const handleAuth = async () => {
    const credentials = { EMAIL: email, PASSWORD: password };
    console.log(credentials);
    try {
      if (loginUser) {
        isLogin = true;
      }
      // if (isLogin) {
      //   console.log("is login");
      //   const response = await loginUser(credentials);
      //   // Handle successful login
      //   // localStorage.setItem("token", response.data.token);
      // } else {
      //   console.log("is NOT");
      //   const response = await signupUser(credentials);
      //   // Handle successful signup
      //   // localStorage.setItem("token", response.data.token);
      // }
    } catch (error) {
      // Handle error
      console.error("Authentication error:", error);
      // Display an error message to the user, clear sensitive input
      // For example:
      //setError("Authentication failed. Please check your credentials.");
      setPassword(""); // Clear the password field
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid
          container
          component="main"
          sx={{ height: "100vh", position: "relative" }}
        >
          <CssBaseline />
          <Grid
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              position: "absolute",
              top: "0",
              right: "0",
              bottom: "0",
            }}
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#06603a" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Connectez-vous
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {
                  "Utilisez les informations fournies par votre superviseur pour vous connecter"
                }
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  label="Adresse e-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  onClick={handleAuth}
                  disabled={isLoginLoading || isSignupLoading}
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#06603a",
                    "&:hover": {
                      backgroundColor: "#06603a",
                    },
                    "&:active": {
                      backgroundColor: "#06603a",
                    },
                  }}
                >
                  SE CONNECTER
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      underline="none"
                      sx={{
                        color: "#06603a",
                        textDecoration: "none",
                        "&:hover": {
                          color: "#06603a",
                          textDecoration: "underline",
                        },
                        "&:active": {
                          color: "#06603a",
                        },
                      }}
                    >
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      // onClick={() => setIsLogin(!isLogin)}
                      href="/signup"
                      variant="body2"
                      sx={{
                        color: "#06603a",
                        textDecoration: "none",
                        "&:hover": {
                          color: "#06603a",
                          textDecoration: "underline",
                        },
                        "&:active": {
                          color: "#06603a",
                        },
                      }}
                    >
                      {"Créer nouveau compte"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
