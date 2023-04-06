const actions = {
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERR: 'LOGIN_ERR',

  LOGOUT_BEGIN: 'LOGOUT_BEGIN',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERR: 'LOGOUT_ERR',

  REGISTER_BEGIN: 'REGISTER_BEGIN',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERR: 'REGISTER_ERR',

  FORGOT_PASS_SUCCESS: 'FORGOT_PASS_SUCCESS',
  FORGOT_PASS_ERR: 'FORGOT_PASS_ERR',

  UPDATE_PASS_SUCCESS: 'UPDATE_PASS_SUCCESS',
  UPDATE_PASS_ERR: 'UPDATE_PASS_ERR',

  CHANGE_PASS_BEGIN: 'CHANGE_PASS_BEGIN',
  CHANGE_PASS_SUCCESS: 'CHANGE_PASS_SUCCESS',
  CHANGE_PASS_ERR: 'CHANGE_PASS_ERR',

  SET_USER: 'SET_USER',

  setUser: data => {
    return {
      type: actions.SET_USER,
      data,
    };
  },

  // REGISTER
  registerBegin: () => {
    return {
      type: actions.REGISTER_BEGIN,
    };
  },

  registerSuccess: data => {
    return {
      type: actions.REGISTER_SUCCESS,
      data,
    };
  },

  registerErr: err => {
    return {
      type: actions.REGISTER_ERR,
      err,
    };
  },

  // LOGIN
  loginBegin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  loginSuccess: data => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },

  loginErr: err => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },

  // LOGOUT
  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  logoutSuccess: data => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data,
    };
  },

  logoutErr: err => {
    return {
      type: actions.LOGOUT_ERR,
      err,
    };
  },

  // FORGOT PASSWORD
  forgotPassSuccess: data => {
    return {
      type: actions.FORGOT_PASS_SUCCESS,
      data,
    };
  },

  forgotPassErr: data => {
    return {
      type: actions.FORGOT_PASS_ERR,
      data,
    };
  },

  // UPDATE PASSWORD
  updatePassSuccess: data => {
    return {
      type: actions.UPDATE_PASS_SUCCESS,
      data,
    };
  },
  updatePassErr: data => {
    return {
      type: actions.UPDATE_PASS_ERR,
      data,
    };
  },

  changePassBegin: () => {
    return {
      type: actions.CHANGE_PASS_BEGIN,
    };
  },

  changePassSuccess: data => {
    return {
      type: actions.CHANGE_PASS_SUCCESS,
      data,
    };
  },

  changePassErr: data => {
    return {
      type: actions.CHANGE_PASS_ERR,
      data,
    };
  },
};

export default actions;
