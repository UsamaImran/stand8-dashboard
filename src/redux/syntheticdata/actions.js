const actions = {
  SYNTHETICDATA_BEGIN: 'SYNTHETICDATA_BEGIN',
  SYNTHETICDATA_SUCCESS: 'SYNTHETICDATA_SUCCESS',
  SYNTHETICDATA_ERR: 'SYNTHETICDATA_ERR',
  RENTALHISTORY_BEGIN: 'RENTALHISTORY_BEGIN',
  RENTALHISTORY_SUCCESS: 'RENTALHISTORY_SUCCESS',
  RENTALHISTORY_ERR: 'RENTALHISTORY_ERR',

  syntheticdataBegin: () => {
    return {
      type: actions.SYNTHETICDATA_BEGIN,
    };
  },

  syntheticdataSuccess: data => {
    return {
      type: actions.SYNTHETICDATA_SUCCESS,
      data,
    };
  },

  syntheticdataErr: err => {
    return {
      type: actions.SYNTHETICDATA_ERR,
      err,
    };
  },

  rentalHistoryBegin: () => {
    return {
      type: actions.RENTALHISTORY_BEGIN,
    };
  },

  rentalHistorySuccess: data => {
    return {
      type: actions.RENTALHISTORY_SUCCESS,
      data,
    };
  },

  rentalHistoryErr: err => {
    return {
      type: actions.RENTALHISTORY_ERR,
      err,
    };
  },
};

export default actions;
