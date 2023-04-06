const actions = {
  READ_USERLOGS_BEGIN: 'READ_USERLOGS_BEGIN',
  READ_USERLOGS_SUCCESS: 'READ_USERLOGS_SUCCESS',
  READ_USERLOGS_ERR: 'READ_USERLOGS_ERR',

  // READ_USERLOGS
  readUserLogsBegin: () => {
    return {
      type: actions.READ_USERLOGS_BEGIN,
    };
  },
  readUserLogsSuccess: data => {
    return {
      type: actions.READ_USERLOGS_SUCCESS,
      data,
    };
  },
  readUserLogsErr: err => {
    return {
      type: actions.READ_USERLOGS_ERR,
      err,
    };
  },
};

export default actions;
