const actions = {
  READ_EDITUSER_BEGIN: 'READ_EDITUSER_BEGIN',
  READ_EDITUSER_SUCCESS: 'READ_EDITUSER_SUCCESS',
  READ_EDITUSER_ERR: 'READ_EDITUSER_ERR',
  UPDATE_EDITUSER_BEGIN: 'UPDATE_EDITUSER_BEGIN',
  UPDATE_EDITUSER_SUCCESS: 'UPDATE_EDITUSER_SUCCESS',
  UPDATE_EDITUSER_ERR: 'UPDATE_EDITUSER_ERR',

  updateEditUserBegin: () => {
    return {
      type: actions.UPDATE_EDITUSER_BEGIN,
    };
  },

  updateEditUserSuccess: data => {
    return {
      type: actions.UPDATE_EDITUSER_SUCCESS,
      data,
    };
  },

  updateEditUserErr: err => {
    return {
      type: actions.UPDATE_EDITUSER_ERR,
      err,
    };
  },

  readEditUserBegin: () => {
    return {
      type: actions.READ_EDITUSER_BEGIN,
    };
  },

  readEditUserSuccess: data => {
    return {
      type: actions.READ_EDITUSER_SUCCESS,
      data,
    };
  },

  readEditUserErr: err => {
    return {
      type: actions.READ_EDITUSER_ERR,
      err,
    };
  },
};

export default actions;
