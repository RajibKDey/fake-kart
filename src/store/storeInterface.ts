import { login } from "./reducers/loginReducer";
import { alert } from "./reducers/alertReducer";

interface state {
  cart: any[];
  login: login;
  alert: alert;
}

export default state;
