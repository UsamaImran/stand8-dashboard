import actions from './actions';
import { getProfileApi, putProfileApi } from './api';

const {
  readProfileBegin,
  readProfileSuccess,
  readProfileErr,
  updateProfileBegin,
  updateProfileSuccess,
  updateProfileErr,
  updateProfileReset,
} = actions;

const getProfile = () => {
  return async dispatch => {
    try {
      dispatch(readProfileBegin());
      const data = await getProfileApi();
      return dispatch(readProfileSuccess(data.user));
    } catch (err) {
      return dispatch(readProfileErr(err.data));
    }
  };
};

const updateProfile = params => {
  return async dispatch => {
    try {
      dispatch(updateProfileBegin());
      const data = await putProfileApi(params);
      return dispatch(updateProfileSuccess({ msg: data, user: params }));
    } catch (err) {
      return dispatch(updateProfileErr(err.response.data));
    }
  };
};

const responseReset = () => {
  return async dispatch => {
    dispatch(updateProfileReset());
  };
};

export { getProfile, updateProfile, responseReset };
