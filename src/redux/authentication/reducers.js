import Cookies from 'js-cookie';
import actions from './actions';

const {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERR,

  LOGOUT_BEGIN,
  LOGOUT_SUCCESS,
  LOGOUT_ERR,

  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_ERR,

  FORGOT_PASS_SUCCESS,
  FORGOT_PASS_ERR,

  UPDATE_PASS_SUCCESS,
  UPDATE_PASS_ERR,

  CHANGE_PASS_BEGIN,
  CHANGE_PASS_SUCCESS,
  CHANGE_PASS_ERR,

  SET_USER,
} = actions;

let user = Cookies.get('user');
if (user !== undefined && user !== null) {
  user = JSON.parse(user);
} else {
  user = { timezone: 'UTC' };
}

const initState = {
  login: Cookies.get('logedIn'),
  signup: false,
  loading: false,
  error: null,
  reg_error: null,
  reg_loading: false,
  forgot_pass_res: null,
  update_pass_res: null,
  change_pass_res: null,
  user,
};

const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: data,
      };

    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data.login,
        user: data.user,
        loading: false,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    // REGISTER
    case REGISTER_BEGIN:
      return {
        ...state,
        signup: false,
        reg_loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        signup: data,
        reg_loading: false,
      };
    case REGISTER_ERR:
      return {
        ...state,
        reg_error: err,
        signup: false,
        reg_loading: false,
      };

    // LOGOUT
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    // FORGOT PASS
    case FORGOT_PASS_SUCCESS:
      return {
        ...state,
        forgot_pass_res: data,
      };
    case FORGOT_PASS_ERR:
      return {
        ...state,
        forgot_pass_res: data,
      };

    // UPDATE PASS
    case UPDATE_PASS_SUCCESS:
      return {
        ...state,
        update_pass_res: data,
      };
    case UPDATE_PASS_ERR:
      return {
        ...state,
        update_pass_res: data,
      };

    // CHANGE PASS

    case CHANGE_PASS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASS_SUCCESS:
      return {
        ...state,
        change_pass_res: data,
      };
    case CHANGE_PASS_ERR:
      return {
        ...state,
        change_pass_res: data,
      };

    default:
      return state;
  }
};
export default AuthReducer;
