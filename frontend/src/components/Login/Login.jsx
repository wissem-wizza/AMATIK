import { useState, useEffect } from "react";
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
// import {
//   useLoginUserMutation,
//   useSignupUserMutation,
// } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import {
  useLoginMutation,
  useSignupMutation,
} from "../../features/auth/authApiSlice";

import { LinearProgress } from "@mui/material";
import styled from "styled-components";

const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #06603a;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #06603a;
    }
  }
  &:hover {
    & label {
      color: #2c7e5e;
    }
    & .MuiOutlinedInput-root {
      fieldset {
        border-color: #2c7e5e;
      }
    }
  }
`;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      component={"span"}
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
      <div style={{ textAlign: "center" }}>
        {"Copyright © "}
        <Link color="inherit" href="#">
          Amatik
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </div>
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  // const userRef = useRef("");
  // const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(userRef.current);
  //   userRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({
        EMAIL: email,
        PASSWORD: password,
      }).unwrap();
      // const userData = await login({ email, password }).unwrap();
      console.log("userData", userData);
      dispatch(setCredentials({ ...userData, email }));

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // // console.log(errRef.current);
      // // errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);

  const handlePwdInput = (e) => setPassword(e.target.value);

  const content = isLoading ? (
    <LinearProgress color="success" />
  ) : (
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
                <WhiteBorderTextField
                  margin="normal"
                  required
                  fullWidth
                  value={email}
                  onChange={handleUserInput}
                  // ref={userRef}
                  // inputRef={userRef}
                  id="email"
                  label="Adresse e-mail"
                  name="email"
                  // autoComplete="email"
                  autoComplete="off"
                  autoFocus
                />
                <WhiteBorderTextField
                  margin="normal"
                  required
                  fullWidth
                  value={password}
                  onChange={handlePwdInput}
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  // autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  onClick={handleSubmit}
                  //   disabled={isLoginLoading || isSignupLoading}
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
  return content;
}
