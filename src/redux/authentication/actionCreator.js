// todo: axios remove
import Cookies from 'js-cookie';
import actions from './actions';
import { signupApi, signinApi, signoutApi, changePassApi } from './api';
import { getProfileApi } from '../profile/api';
import { setItem, removeItem } from '../../utility/localStorageControl';
import axios from '../../services/axios';

const {
  loginBegin,
  loginSuccess,
  loginErr,

  logoutBegin,
  logoutSuccess,
  logoutErr,

  registerBegin,
  registerSuccess,
  registerErr,

  forgotPassSuccess,
  forgotPassErr,

  updatePassSuccess,
  updatePassErr,

  changePassBegin,
  changePassSuccess,
  changePassErr,

  setUser,
} = actions;

const changeUserInfo = user => {
  return async dispatch => {
    dispatch(setUser(user));
  };
};

const register = params => {
  return async dispatch => {
    try {
      dispatch(registerBegin());
      const res = await signupApi(params);
      dispatch(registerSuccess(res.status === 'ok'));
    } catch (err) {
      dispatch(registerErr(err.data.message));
    }
  };
};

const login = params => {
  return async dispatch => {
    try {
      dispatch(loginBegin());
      const signinRes = await signinApi(params);
      const { token } = signinRes;
      const myPromise = new Promise(resolve => {
        setItem('access_token', token);
        resolve();
      });

      myPromise.then(async () => {
        const userRes = await getProfileApi();
        dispatch(loginSuccess({ login: true, user: userRes.user }));
        Cookies.set('token', token);
        Cookies.set('logedIn', true);
        Cookies.set('user', userRes.user);
        axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      });
    } catch (err) {
      dispatch(loginErr(err.data.message));
    }
  };
};

const logOut = ignoreApi => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      let res = {
        status: 'ok',
      };
      if (!ignoreApi) {
        res = await signoutApi();
      }

      removeItem('access_token');
      removeItem('weeklySummaryModal');
      Cookies.remove('logedIn');
      Cookies.remove('user');
      dispatch(logoutSuccess(res.status !== 'ok'));
    } catch (err) {
      dispatch(logoutErr(err.data?.message));
    }
  };
};

const initRegister = () => {
  return async dispatch => {
    dispatch(registerSuccess(false));
    dispatch(registerErr(null));
  };
};

const forgotPass = ({ email }) => {
  return async dispatch => {
    return axios
      .post(`/reset-password`, { email })
      .then(res => {
        return dispatch(forgotPassSuccess(res.data));
      })
      .catch(err => {
        return dispatch(forgotPassErr({ ...err.response.data, status: 'error' }));
      });
  };
};

const updatePass = params => {
  return async dispatch => {
    return axios
      .post(`/reset-password/update`, params)
      .then(res => {
        return dispatch(updatePassSuccess(res.data));
      })
      .catch(err => {
        return dispatch(updatePassErr({ ...err.response.data, status: 'error' }));
      });
  };
};

const changePass = params => {
  return async dispatch => {
    try {
      dispatch(changePassBegin());
      const res = await changePassApi(params);
      dispatch(changePassSuccess(res));
    } catch (err) {
      dispatch(changePassErr(err));
    }
  };
};

export { initRegister, login, register, logOut, forgotPass, updatePass, changeUserInfo, changePass };
