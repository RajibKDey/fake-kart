import cloneDeep from 'lodash/cloneDeep';

import { SIGN_IN, SIGN_OUT, SIGN_IN_SUCCESSFUL, SIGN_UP, SIGN_UP_SUCCESSFUL, HAS_ERROR } from '../constants';

interface login {
    loading: boolean;
    isLoggedIn: boolean;
    token: string;
    error: string;
}
const initialState: login = {
  loading: false,
  isLoggedIn: false,
  token: '',
  error: '',
};

const loginReducer = (state = initialState, action: any = {}) => {
  const newState = cloneDeep(state);
  switch (action.type) {
    case SIGN_IN:
        return {
            ...state,
            loading: true,
        }
    case SIGN_OUT:
        return {
            ...initialState,
        }
    case SIGN_IN_SUCCESSFUL:
        return {
            ...state,
            loading: false,
            isLoggedIn: true,
            token: action.token,
        }
    case SIGN_UP:
        return {
            ...state,
            loading: true,
        }
    case SIGN_UP_SUCCESSFUL:
        return {
            ...state,
            loading: false,
        }
    case HAS_ERROR:
        return {
            ...state,
            loading: false,
            error: action.error,
        }
    default:
      return newState;
  }
};

export type { login };
export default loginReducer;