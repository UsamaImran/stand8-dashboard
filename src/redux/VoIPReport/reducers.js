import actions from './actions';

const initialState = {
  isLoading: true,
  list: [],
  error: null,
};

const { FETCH_VOIP_REPORT_LIST_INIT, FETCH_VOIP_REPORT_LIST_SUCCESS, FETCH_VOIP_REPORT_LIST_FAILURE } = actions;

const voIPReportReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_VOIP_REPORT_LIST_INIT:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_VOIP_REPORT_LIST_SUCCESS:
      return {
        ...state,
        list: payload,
        isLoading: false,
      };

    case FETCH_VOIP_REPORT_LIST_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default voIPReportReducer;
