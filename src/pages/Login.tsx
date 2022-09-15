import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Paper,
  FormControl,
  IconButton,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  onLogin,
  onLoginSuccess,
  onLoginError,
} from "../store/actions/loginActions";
import { doLogin } from "../services";
import BackdropOverlay from "../components/BackdropOverlay";

const sx = {
  container: {
    padding: { xs: 0 },
    margin: { xs: 0 },
  },
  root: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 65px)",
    width: "100vw",
    padding: { xs: 0 },
    margin: { xs: 0 },
  },
  inputStyleRoot: {
    width: "100%",
    marginBottom: 1,
    "& label": {
      color: "orange",
      fontSize: "1.2rem",
    },
  },
  paperSpace: {
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: "20px",
    borderBottomWidth: { xs: 0, sm: 1 },
    borderBottomLeftRadius: { xs: 0, sm: "20px" },
    borderBottomRightRadius: { xs: 0, sm: "20px" },
    position: { xs: "fixed", sm: "relative" },
    left: { xs: 0 },
    bottom: { xs: 50 },
    right: { xs: 0 },
  },
  maxContainer: {
    maxWidth: { xs: "470px" },
  },
  clientIdText: {
    color: "success.main",
    marginTop: 2,
    marginBottom: 2,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    flexDirection: { xs: "column", sm: "row" },
  },
  buttonItem: {
    width: "inherit",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    textTransform: "none",
    marginLeft: { xs: 0, sm: 1 },
    marginRight: { xs: 0, sm: 1 },
    width: { xs: "100%", sm: "80%" },
    borderWidth: "1.25px",
    borderRadius: 2,
    borderColor: "orange",
  },
  firstButton: {
    marginBottom: { xs: 1.5, sm: 0 },
  },
};

interface LoginState {
  visibility: boolean;
}

interface LoginProps {
  loading: boolean;
  onLogin: () => void;
  onLoginSuccess: (token: string) => void;
  onLoginError: (error: string) => void;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      visibility: false,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggleShowPassword() {
    this.setState((prevState) => {
      return { visibility: !prevState.visibility };
    });
  }

  async onSubmit(e: any) {
    const { onLogin, onLoginSuccess, onLoginError } = this.props;
    const data = e;
    onLogin();
    try {
      const response: any = await doLogin(data);
      if (!response?.token) {
        throw new Error("Login failed");
      }
      onLoginSuccess(response?.token);
    } catch (err: any) {
      onLoginError(err.message);
    }
  }

  handleSignUpClick() {
    window.location.href = "/signup";
  }

  render() {
    const { visibility } = this.state;
    const { loading } = this.props;
    return (
      <Container sx={sx.container}>
        <BackdropOverlay open={loading} color="primary" />
        <Grid container sx={sx.root}>
          <Grid item lg={5} md={5} xs={12} sx={sx.maxContainer}>
            <Paper variant="outlined" sx={sx.paperSpace}>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                onSubmit={this.onSubmit}
                validationSchema={Yup.object().shape({
                  username: Yup.string()
                    .max(255)
                    .matches(/^[A-Za-z0-9_]*$/, "Username is invalid")
                    .required("Username is required"),
                  password: Yup.string()
                    .required("Password is required")
                    .trim("The password cannot include spaces")
                    .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/,
                      "The password match one or more conditions"
                    )
                    .strict(true),
                })}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  } = props;
                  return (
                    <form onSubmit={handleSubmit}>
                      <FormControl variant="outlined" sx={sx.inputStyleRoot}>
                        <TextField
                          error={
                            Boolean(errors.username) &&
                            Boolean(touched.username)
                          }
                          name="username"
                          type="text"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Username"
                          variant="standard"
                          helperText={
                            Boolean(errors.username) && errors.username
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                          }}
                          margin="dense"
                        />
                      </FormControl>

                      <FormControl
                        variant="outlined"
                        sx={{ ...sx.inputStyleRoot, marginBottom: 0 }}
                      >
                        <TextField
                          error={
                            Boolean(errors.password) &&
                            Boolean(touched.password)
                          }
                          label="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.password &&
                            touched.password &&
                            errors.password
                          }
                          type={visibility ? "text" : "password"}
                          variant="standard"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.toggleShowPassword}
                                edge="end"
                                size="small"
                              >
                                {!visibility ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            ),
                          }}
                          margin="dense"
                        />
                      </FormControl>
                      <Link
                        to="/forgetPassword"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          href="#text-buttons"
                          color="primary"
                          style={{
                            textTransform: "none",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          Forgot password ?
                        </Button>
                      </Link>
                      <Grid container sx={sx.buttonContainer}>
                        <Grid
                          item
                          xl={6}
                          lg={6}
                          md={6}
                          sm={6}
                          xs={12}
                          sx={sx.buttonItem}
                        >
                          <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            sx={{ ...sx.button, ...sx.firstButton }}
                          >
                            Sign In
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xl={6}
                          lg={6}
                          md={6}
                          sm={6}
                          xs={12}
                          sx={sx.buttonItem}
                        >
                          <Button
                            color="primary"
                            variant="outlined"
                            sx={sx.button}
                            onClick={this.handleSignUpClick}
                          >
                            Sign Up
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  );
                }}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loading: state.login.loading,
});

const mapDispatchToProps = {
  onLogin,
  onLoginSuccess,
  onLoginError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
