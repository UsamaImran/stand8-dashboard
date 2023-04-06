import actions from './actions';

const initialState = {
  pcLoading: false,
  bcLoading: false,
  caLoading: false,
  voipPieChartData: null,
  voipBarChartData: null,
  voipCallStatsData: {},
  error: null,
};

const {
  VOIP_PIECHART_BEGIN,
  VOIP_PIECHART_SUCCESS,

  VOIP_PIECHART_ERR,
  VOIP_BARCHART_BEGIN,

  VOIP_BARCHART_SUCCESS,
  VOIP_BARCHART_ERR,

  VOIP_CALL_STATISTICS_BEGIN,
  VOIP_CALL_STATISTICS_SUCCESS,

  VOIP_CALL_STATISTICS_ERR,
} = actions;

const voipPieChartReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case VOIP_PIECHART_BEGIN:
      return {
        ...state,
        pcLoading: true,
      };
    case VOIP_PIECHART_SUCCESS:
      return {
        ...state,
        voipPieChartData: data,
        pcLoading: false,
      };
    case VOIP_PIECHART_ERR:
      return {
        ...state,
        error: err,
        pcLoading: false,
      };
    case VOIP_BARCHART_BEGIN:
      return {
        ...state,
        bcLoading: true,
      };
    case VOIP_BARCHART_SUCCESS:
      return {
        ...state,
        voipBarChartData: data,
        bcLoading: false,
      };
    case VOIP_BARCHART_ERR:
      return {
        ...state,
        error: err,
        bcLoading: false,
      };
    case VOIP_CALL_STATISTICS_BEGIN:
      return {
        ...state,
        caLoading: true,
      };
    case VOIP_CALL_STATISTICS_SUCCESS:
      return {
        ...state,
        voipCallStatsData: data,
        caLoading: false,
      };
    case VOIP_CALL_STATISTICS_ERR:
      return {
        ...state,
        error: err,
        caLoading: false,
      };

    default:
      return state;
  }
};

export default voipPieChartReducer;
