const actions = {
  FETCH_VOIP_REPORT_LIST_INIT: '[VOIP Report Page] FETCH_VOIP_REPORT_LIST_INIT',
  FETCH_VOIP_REPORT_LIST_SUCCESS: '[VOIP Report Page] FETCH_VOIP_REPORT_LIST_SUCCESS',
  FETCH_VOIP_REPORT_LIST_FAILURE: '[VOIP Report Page] FETCH_VOIP_REPORT_LIST_FAILURE',

  fetchDataInit: () => {
    return {
      type: actions.FETCH_VOIP_REPORT_LIST_INIT,
    };
  },

  fetchDataSuccess: data => {
    return {
      type: actions.FETCH_VOIP_REPORT_LIST_SUCCESS,
      payload: data,
    };
  },

  fetchDataFailure: () => {
    return {
      type: actions.FETCH_VOIP_REPORT_LIST_FAILURE,
    };
  },
};

export default actions;
