import { SIGN_IN, SIGN_IN_SUCCESSFUL, SIGN_UP, SIGN_UP_SUCCESSFUL, HAS_ERROR, SHOW_ALERT } from "../constants";

const onLogin = () => {
  return (dispatch: any) => {
    dispatch({ type: SIGN_IN });
  };
};

const onLoginSuccess = (token: string) => {
  return (dispatch: any) => {
    dispatch({ type: SIGN_IN_SUCCESSFUL, token: token });
    dispatch({ type: SHOW_ALERT, message: 'Logged in successfully', status: 'success' });
  };
};

const onLoginError = (error: any) => {
  return (dispatch: any) => {
    dispatch({ type: HAS_ERROR, error: error });
    dispatch({ type: SHOW_ALERT, message: 'Error occurred while logging in', status: 'error' });
  };
};

const onSignUp = () => {
  return (dispatch: any) => {
    dispatch({ type: SIGN_UP });
  };
};

const onSignUpSuccess = () => {
    return (dispatch: any) => {
      dispatch({ type: SIGN_UP_SUCCESSFUL });
      dispatch({ type: SHOW_ALERT, message: 'User signed in successfully', status: 'success' });
    };
};

const onSignUpError = (error: any) => {
    return (dispatch: any) => {
      dispatch({ type: HAS_ERROR, error: error });
      dispatch({ type: SHOW_ALERT, message: 'Error occurred while signing in', status: 'error' });
    };
};

export { onLogin, onLoginSuccess, onLoginError, onSignUp, onSignUpSuccess, onSignUpError };
