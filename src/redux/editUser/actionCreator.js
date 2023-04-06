import actions from './actions';
import { putEditUserApi } from './api';

const {
  readEditUserBegin,
  readEditUserSuccess,
  readEditUserErr,
  updateEditUserBegin,
  updateEditUserSuccess,
  updateEditUserErr,
} = actions;

const readEditUser = data => {
  return async dispatch => {
    try {
      dispatch(readEditUserBegin());
      dispatch(readEditUserSuccess(data));
    } catch (err) {
      dispatch(readEditUserErr(err));
    }
  };
};

const updateEditUser = param => {
  return async dispatch => {
    try {
      dispatch(updateEditUserBegin());
      const data = await putEditUserApi(param);
      dispatch(updateEditUserSuccess(data.data));
    } catch (err) {
      dispatch(updateEditUserErr(err));
    }
  };
};

export { readEditUser, updateEditUser };
