const actions = {
  PERFORMANCE_BEGIN: 'PERFORMANCE_BEGIN_TEXTUS',
  PERFORMANCE_SUCCESS: 'PERFORMANCE_SUCCESS_TEXTUS',
  PERFORMANCE_ERR: 'PERFORMANCE_ERR_TEXTUS',

  UPDATE_LOADING_BEGIN: 'UPDATE_LOADING_BEGIN_TEXTUS',
  UPDATE_LOADING_SUCCESS: 'UPDATE_LOADING_SUCCESS_TEXTUS',
  UPDATE_LOADING_ERR: 'UPDATE_LOADING_ERR_TEXTUS',

  TEXTUSUSERS_BEGIN: 'TEXTUSUSERS_BEGIN_TEXTUS',
  TEXTUSUSERS_SUCCESS: 'TEXTUSUSERS_SUCCESS_TEXTUS',
  TEXTUSUSERS_ERR: 'TEXTUSUSERS_ERR_TEXTUS',

  TEXTUS_ONE_USERS_BEGIN: 'TEXTUS_ONE_USERS_BEGIN_TEXTUS',
  TEXTUS_ONE_USERS_SUCCESS: 'TEXTUS_ONE_USERS_SUCCESS_TEXTUS',
  TEXTUS_ONE_USERS_ERR: 'TEXTUS_ONE_USERS_ERR_TEXTUS',

  TEXTUSOVERVIEW_BEGIN: 'TEXTUSOVERVIEW_BEGIN_TEXTUS',
  TEXTUSOVERVIEW_SUCCESS: 'TEXTUSOVERVIEW_SUCCESS_TEXTUS',
  TEXTUSOVERVIEW_ERR: 'TEXTUSOVERVIEW_ERR_TEXTUS',

  SET_DATE: '[textus] set selected date range_TEXTUS',

  setDate: data => {
    return {
      type: actions.SET_DATE,
      data,
    };
  },

  textUsUsersBegin: () => {
    return {
      type: actions.TEXTUSUSERS_BEGIN,
    };
  },

  textUsUsersSuccess: data => {
    return {
      type: actions.TEXTUSUSERS_SUCCESS,
      data,
    };
  },

  textUsUsersErr: err => {
    return {
      type: actions.TEXTUSUSERS_ERR,
      err,
    };
  },

  textUsOneUsersBegin: () => {
    return {
      type: actions.TEXTUS_ONE_USERS_BEGIN,
    };
  },

  textUsOneUsersSuccess: data => {
    return {
      type: actions.TEXTUS_ONE_USERS_SUCCESS,
      data,
    };
  },

  textUsOneUsersErr: err => {
    return {
      type: actions.TEXTUS_ONE_USERS_ERR,
      err,
    };
  },

  textUsOverviewBegin: () => {
    return {
      type: actions.TEXTUSOVERVIEW_BEGIN,
    };
  },

  textUsOverviewSuccess: data => {
    return {
      type: actions.TEXTUSOVERVIEW_SUCCESS,
      data,
    };
  },

  textUsOverviewErr: err => {
    return {
      type: actions.TEXTUSOVERVIEW_ERR,
      err,
    };
  },

  updateLoadingBegin: () => {
    return {
      type: actions.UPDATE_LOADING_BEGIN,
    };
  },

  updateLoadingSuccess: data => {
    return {
      type: actions.UPDATE_LOADING_SUCCESS,
      data,
    };
  },

  updateLoadingErr: err => {
    return {
      type: actions.UPDATE_LOADING_ERR,
      err,
    };
  },

  performanceBegin: () => {
    return {
      type: actions.PERFORMANCE_BEGIN,
    };
  },

  performanceSuccess: data => {
    return {
      type: actions.PERFORMANCE_SUCCESS,
      data,
    };
  },

  performanceErr: err => {
    return {
      type: actions.PERFORMANCE_ERR,
      err,
    };
  },
};

export default actions;
