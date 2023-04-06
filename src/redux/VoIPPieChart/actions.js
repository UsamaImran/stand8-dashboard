const actions = {
  VOIP_PIECHART_BEGIN: 'VOIP_PIECHART_BEGIN',
  VOIP_PIECHART_SUCCESS: 'VOIP_PIECHART_SUCCESS',
  VOIP_PIECHART_ERR: 'VOIP_PIECHART_ERR',
  VOIP_BARCHART_BEGIN: 'VOIP_BARCHART_BEGIN',
  VOIP_BARCHART_SUCCESS: 'VOIP_BARCHART_SUCCESS',
  VOIP_BARCHART_ERR: 'VOIP_BARCHART_ERR',
  VOIP_CALL_STATISTICS_BEGIN: 'VOIP_CALL_STATISTICS_BEGIN',
  VOIP_CALL_STATISTICS_SUCCESS: 'VOIP_CALL_STATISTICS_SUCCESS',
  VOIP_CALL_STATISTICS_ERR: 'VOIP_CALL_STATISTICS_ERR',

  voipPieChartBegin: () => {
    return {
      type: actions.VOIP_PIECHART_BEGIN,
    };
  },

  voipPieChartSuccess: data => {
    return {
      type: actions.VOIP_PIECHART_SUCCESS,
      data,
    };
  },

  voipPieChartErr: err => {
    return {
      type: actions.VOIP_PIECHART_ERR,
      err,
    };
  },
  voipBarChartBegin: () => {
    return {
      type: actions.VOIP_BARCHART_BEGIN,
    };
  },

  voipBarChartSuccess: data => {
    return {
      type: actions.VOIP_BARCHART_SUCCESS,
      data,
    };
  },

  voipBarChartErr: err => {
    return {
      type: actions.VOIP_BARCHART_ERR,
      err,
    };
  },

  voipCallStatisticsBegin: () => {
    return {
      type: actions.VOIP_CALL_STATISTICS_BEGIN,
    };
  },

  voipCallStatisticsSuccess: data => {
    return {
      type: actions.VOIP_CALL_STATISTICS_SUCCESS,
      data,
    };
  },

  voipCallStatisticsErr: data => {
    return {
      type: actions.VOIP_CALL_STATISTICS_ERR,
      data,
    };
  },
};

export default actions;
