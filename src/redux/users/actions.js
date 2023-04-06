const actions = {
  CREATE_USER_BEGIN: 'CREATE_USER_BEGIN',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_ERR: 'CREATE_USER_ERR',

  READ_USERS_BEGIN: 'READ_USERS_BEGIN',
  READ_USERS_SUCCESS: 'READ_USERS_SUCCESS',
  READ_USERS_ERR: 'READ_USERS_ERR',

  UPDATE_USER_BEGIN: 'UPDATE_USER_BEGIN',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERR: 'UPDATE_USER_ERR',

  DELETE_USER_BEGIN: 'DELETE_USER_BEGIN',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_ERR: 'DELETE_USER_ERR',

  // CREATE_USER
  createUserBegin: () => {
    return {
      type: actions.CREATE_USER_BEGIN,
    };
  },
  createUserSuccess: data => {
    return {
      type: actions.CREATE_USER_SUCCESS,
      data,
    };
  },
  createUserErr: err => {
    return {
      type: actions.CREATE_USER_ERR,
      err,
    };
  },

  // READ_USERS
  readUsersBegin: () => {
    return {
      type: actions.READ_USERS_BEGIN,
    };
  },
  readUsersSuccess: data => {
    return {
      type: actions.READ_USERS_SUCCESS,
      data,
    };
  },
  readUsersErr: err => {
    return {
      type: actions.READ_USERS_ERR,
      err,
    };
  },

  // UPDATE USER
  updateUserBegin: () => {
    return {
      type: actions.UPDATE_USER_BEGIN,
    };
  },
  updateUserSuccess: data => {
    return {
      type: actions.UPDATE_USER_SUCCESS,
      data,
    };
  },
  updateUserErr: err => {
    return {
      type: actions.UPDATE_USER_ERR,
      err,
    };
  },

  // DELETE USER
  deleteUserBegin: () => {
    return {
      type: actions.DELETE_USER_BEGIN,
    };
  },
  deleteUserSuccess: data => {
    return {
      type: actions.DELETE_USER_SUCCESS,
      data,
    };
  },
  deleteUserErr: data => {
    return {
      type: actions.DELETE_USER_Err,
      data,
    };
  },
};

export default actions;
