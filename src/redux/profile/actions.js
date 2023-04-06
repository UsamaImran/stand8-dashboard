const actions = {
  READ_PROFILE_BEGIN: 'READ_PROFILE_BEGIN',
  READ_PROFILE_SUCCESS: 'READ_PROFILE_SUCCESS',
  READ_PROFILE_ERR: 'READ_PROFILE_ERR',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_ERR: 'UPDATE_PROFILE_ERR',
  UPDATE_PROFILE_BEGIN: 'UPDATE_PROFILE_BEGIN',
  UPDATE_PROFILE_RESET: 'UPDATE_PROFILE_RESET',

  readProfileBegin: () => {
    return {
      type: actions.READ_PROFILE_BEGIN,
    };
  },

  readProfileErr: data => {
    return {
      type: actions.READ_PROFILE_ERR,
      data,
    };
  },

  readProfileSuccess: data => {
    return {
      type: actions.READ_PROFILE_SUCCESS,
      data,
    };
  },

  updateProfileBegin: () => {
    return {
      type: actions.UPDATE_PROFILE_BEGIN,
    };
  },

  updateProfileSuccess: data => {
    return {
      type: actions.UPDATE_PROFILE_SUCCESS,
      data,
    };
  },
  updateProfileReset: () => {
    return {
      type: actions.UPDATE_PROFILE_RESET,
    };
  },
  updateProfileErr: data => {
    return {
      type: actions.UPDATE_PROFILE_ERR,
      data,
    };
  },
};

export default actions;
