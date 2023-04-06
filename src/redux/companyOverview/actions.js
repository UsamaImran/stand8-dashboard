const actions = {
  COMPANY_OVERVIEW_BEGIN: 'COMPANY_OVERVIEW_BEGIN',
  COMPANY_OVERVIEW_SUCCESS: 'COMPANY_OVERVIEW_SUCCESS',
  COMPANY_OVERVIEW_ERR: 'COMPANY_OVERVIEW_ERR',

  READ_COMPANY_LEADERBOARD_BEGIN: 'READ_COMPANY_OVERVIEW_LEADERBOARD_BEGIN',
  READ_COMPANY_LEADERBOARD_SUCCESS: 'READ_COMPANY_OVERVIEW_LEADERBOARD_SUCCESS',
  SET_CUSTOM_DATE: 'SET_LEADERBOARD_CUSTOM_DATE',

  READ_COMPANY_REVENUE_BEGIN: 'READ_COMPANY_OVERVIEW_REVENUE_BEGIN',
  READ_COMPANY_REVENUE_SUCCESS: 'READ_COMPANY_OVERVIEW_REVENUE_SUCCESS',
  SET_REVENUE_CUSTOM_DATE: 'SET_REVENUE_CUSTOM_DATE',

  READ_HIRING_REVENUE_BEGIN: 'READ_HIRING_REVENUE_BEGIN',
  READ_HIRING_REVENUE_SUCCESS: 'READ_HIRING_REVENUE_SUCCESS',
  SET_HIRING_REVENUE_CUSTOM_DATE: 'SET_HIRING_REVENUE_CUSTOM_DATE',

  READ_TOP_PERFORMERS_BEGIN: 'READ_TOP_PERFORMERS_BEGIN',
  READ_TOP_PERFORMERS_SUCCESS: 'READ_TOP_PERFORMERS_SUCCESS',

  READ_SPREAD_HISTORY_BEGIN: 'READ_COMPANY_SPREAD_HISTORY_BEGIN',
  READ_SPREAD_HISTORY_SUCCESS: 'READ_COMPANY_SPREAD_HISTORY_SUCCESS',

  READ_PERFORMERS_DETAILS_BEGIN: 'READ_PERFORMERS_DETAILS_BEGIN',
  READ_PERFORMERS_DETAILS_SUCCESS: 'READ_PERFORMERS_DETAILS_SUCCESS',

  READ_PLACEMENT_DETAILS_BEGIN: 'READ_PLACEMENT_DETAILS_BEGIN',
  READ_PLACEMENT_DETAILS_SUCCESS: 'READ_PLACEMENT_DETAILS_SUCCESS',

  getCompanyOverviewBegin: () => {
    return {
      type: actions.COMPANY_OVERVIEW_BEGIN,
    };
  },

  getCompanyOverviewSuccess: data => {
    return {
      type: actions.COMPANY_OVERVIEW_SUCCESS,
      data,
    };
  },

  getCompanyOverviewErr: err => {
    return {
      type: actions.COMPANY_OVERVIEW_ERR,
      err,
    };
  },

  readCompanyLBBegin: () => {
    return {
      type: actions.READ_COMPANY_LEADERBOARD_BEGIN,
    };
  },

  readCompanyLBSuccess: data => {
    return {
      type: actions.READ_COMPANY_LEADERBOARD_SUCCESS,
      data,
    };
  },

  setCustomDateRangeAction: data => {
    return {
      type: actions.SET_CUSTOM_DATE,
      data,
    };
  },

  readCompanyRevenueBegin: () => {
    return {
      type: actions.READ_COMPANY_REVENUE_BEGIN,
    };
  },

  readCompanyRevenueSuccess: data => {
    return {
      type: actions.READ_COMPANY_REVENUE_SUCCESS,
      data,
    };
  },

  setRevenueCustomDateRangeAction: data => {
    return {
      type: actions.SET_REVENUE_CUSTOM_DATE,
      data,
    };
  },

  readHiringRevenueBegin: () => {
    return {
      type: actions.READ_HIRING_REVENUE_BEGIN,
    };
  },

  readHiringRevenueSuccess: data => {
    return {
      type: actions.READ_HIRING_REVENUE_SUCCESS,
      data,
    };
  },

  setHiringRevenueCustomDateRangeAction: data => {
    return {
      type: actions.SET_HIRING_REVENUE_CUSTOM_DATE,
      data,
    };
  },

  readTopPerformersBegin: () => {
    return {
      type: actions.READ_TOP_PERFORMERS_BEGIN,
    };
  },

  readTopPerformersSuccess: data => {
    return {
      type: actions.READ_TOP_PERFORMERS_SUCCESS,
      data,
    };
  },

  readSpreadHistoryBegin: () => {
    return {
      type: actions.READ_SPREAD_HISTORY_BEGIN,
    };
  },
  readSpreadHistorySuccess: data => {
    return {
      type: actions.READ_SPREAD_HISTORY_SUCCESS,
      data,
    };
  },

  readPerformersDetailsBegin: () => {
    return { type: actions.READ_PERFORMERS_DETAILS_BEGIN };
  },
  readPerformersDetailsSuccess: data => {
    return { type: actions.READ_PERFORMERS_DETAILS_SUCCESS, data };
  },

  readPlacementDetailsBegin: () => ({ type: actions.READ_PLACEMENT_DETAILS_BEGIN }),

  readPlacementDetailsSuccess: data => ({ type: actions.READ_PLACEMENT_DETAILS_SUCCESS, data }),
};

export default actions;
