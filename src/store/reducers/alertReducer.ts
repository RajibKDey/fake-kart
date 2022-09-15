import { AlertColor } from "@mui/material";
import cloneDeep from "lodash/cloneDeep";

import { SHOW_ALERT, HIDE_ALERT } from "../constants";

interface alert {
  showAlert: boolean;
  message: string;
  status: AlertColor;
}

const initialState: alert = {
  showAlert: false,
  message: "",
  status: 'success',
};

const alertReducer = (state = initialState, action: any = {}) => {
  let newState = cloneDeep(state);

  switch (action.type) {
    case SHOW_ALERT:
      newState.showAlert = true;
      newState.message = action.message;
      newState.status = action.status;
      break;
    case HIDE_ALERT:
      newState = cloneDeep(initialState);
      break;
    default:
      break;
  }

  return newState;
};

export type { alert };
export default alertReducer;
