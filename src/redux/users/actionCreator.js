import actions from './actions';
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi } from './api';

const {
  createUserBegin,
  createUserSuccess,
  createUserErr,
  readUsersBegin,
  readUsersSuccess,
  readUsersErr,
  updateUserBegin,
  updateUserSuccess,
  updateUserErr,
  deleteUserBegin,
  deleteUserSuccess,
  deleteUserErr,
} = actions;

const getUsers = () => {
  return async dispatch => {
    try {
      dispatch(readUsersBegin());
      const res = await getUsersApi();
      dispatch(readUsersSuccess(res.data));
    } catch (err) {
      dispatch(readUsersErr(err.data?.message));
    }
  };
};

const createUser = params => {
  return async dispatch => {
    try {
      dispatch(createUserBegin());
      const res = await createUserApi(params);
      return dispatch(createUserSuccess(res.data));
    } catch (err) {
      return dispatch(createUserErr(err.data));
    }
  };
};

const updateUser = params => {
  return async dispatch => {
    try {
      dispatch(updateUserBegin());
      const res = await updateUserApi(params);
      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      dispatch(updateUserErr(err.data.message));
    }
  };
};

const deleteUser = userId => {
  return async dispatch => {
    try {
      dispatch(deleteUserBegin());
      await deleteUserApi(userId);
      dispatch(deleteUserSuccess(userId));
    } catch (err) {
      dispatch(deleteUserErr(err.data.message));
    }
  };
};

export { getUsers, createUser, updateUser, deleteUser };
