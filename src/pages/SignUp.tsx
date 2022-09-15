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
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import BackdropOverlay from "../components/BackdropOverlay";
import { onSignUp, onSignUpError, onSignUpSuccess } from "../store/actions/loginActions";
import { doSignUp } from "../services";

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
    height: { xs: "255px", sm: "auto" },
    overflowY: { xs: "auto", sm: "hidden" },
    left: { xs: 0 },
    bottom: { xs: 50 },
    right: { xs: 0 },
  },
  maxContainer: {
    maxWidth: { xs: "470px" },
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

interface SignUpState {
  visibility: boolean;
  confirmPwdVisibility: boolean;
}

interface SignUpProps {
    loading: boolean;
    onSignUp: () => void;
    onSignUpSuccess: () => void;
    onSignUpError: (error: string) => void;
}

class SignUp extends Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
    super(props);
    this.state = {
      visibility: false,
      confirmPwdVisibility: false,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.toggleShowConfirmPassword = this.toggleShowConfirmPassword.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggleShowPassword() {
    this.setState((prevState) => {
      return { visibility: !prevState.visibility };
    });
  }

  toggleShowConfirmPassword() {
    this.setState((prevState) => {
      return { confirmPwdVisibility: !prevState.confirmPwdVisibility };
    });
  }

  async onSubmit(e: any) {
    const { onSignUp, onSignUpSuccess, onSignUpError } = this.props;
    const data = e;
    delete data.confirmPassword;
    onSignUp();
    try {
        const response: any = await doSignUp(data);
        if (!response || !response.id) {
            throw new Error("SignUp failed");
        }
        onSignUpSuccess();
    } catch (err: any) {
        onSignUpError(err.message);
    }

  }

  handleLoginClick() {
    window.location.href = "/login";
  }

  render() {
    const { visibility, confirmPwdVisibility } = this.state;
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
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={this.onSubmit}
                validationSchema={Yup.object().shape({
                  username: Yup.string()
                    .max(255)
                    .matches(/^[A-Za-z0-9_]*$/, "Username is invalid")
                    .required("Username is required"),
                  email: Yup.string()
                    .max(255)
                    .email("Email is invalid")
                    .required("Email is required"),
                  password: Yup.string()
                    .required("Password is required")
                    .trim("The password cannot include spaces")
                    .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
                      "The password match one or more conditions"
                    )
                    .strict(true),
                  confirmPassword: Yup.string()
                    .required("Confirm Password is required")
                    .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
                      <FormControl variant="outlined" sx={sx.inputStyleRoot}>
                        <TextField
                          error={
                            Boolean(errors.email) && Boolean(touched.email)
                          }
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Email Address"
                          variant="standard"
                          helperText={Boolean(errors.email) && errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                          }}
                          margin="dense"
                        />
                      </FormControl>
                      <FormControl variant="outlined" sx={sx.inputStyleRoot}>
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
                      <FormControl variant="outlined" sx={sx.inputStyleRoot}>
                        <TextField
                          error={
                            Boolean(errors.confirmPassword) &&
                            Boolean(touched.confirmPassword)
                          }
                          label="Confirm Password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={
                            errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword
                          }
                          type={confirmPwdVisibility ? "text" : "password"}
                          variant="standard"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={this.toggleShowConfirmPassword}
                                edge="end"
                                size="small"
                              >
                                {!confirmPwdVisibility ? (
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
                      <Typography variant="body1">
                        By signing up you agree to our&nbsp;
                        <Link
                          to="/terms"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          Terms of service
                        </Link>{" "}
                        and&nbsp;
                        <Link
                          to="/policy"
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          Privacy policy
                        </Link>
                      </Typography>
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
                            Sign Up
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
                            onClick={this.handleLoginClick}
                          >
                            Sign In
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
    onSignUp,
    onSignUpSuccess,
    onSignUpError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
