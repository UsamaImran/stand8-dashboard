const actions = {
  READ_ACCOUNT_SUMMARY_SUCCESS: 'READ_RECRUITER_ACCOUNT_SUMMARY_SUCCESS',
  READ_MONTHLY_SUMMARY_SUCCESS: 'READ_RECRUITER_MONTHLY_SUMMARY_SUCCESS',
  READ_WEEKLY_SUMMARY_SUCCESS: 'READ_RECRUITER_WEEKLY_SUMMARY_SUCCESS',
  READ_WEEKLY_SALES_TARGET_SUCCESS: 'READ_RECRUITER_WEEKLY_SALES_TARGET_SUCCESS',
  READ_TEXTUS_SUCCESS: 'READ_RECRUITER_TEXTUS_SUCCESS',
  READ_VOIP_SUCCESS: 'READ_RECRUITER_VOIP_SUCCESS',
  READ_CONTRACTORS_ENDING_SUCCESS: 'READ_RECRUITER_CONTRACTORS_ENDING_SUCCESS',
  READ_SPREAD_HISTORY_BEGIN: 'READ_RECRUITER_SPREAD_HISTORY_BEGIN',
  READ_SPREAD_HISTORY_SUCCESS: 'READ_RECRUITER_SPREAD_HISTORY_SUCCESS',
  READ_COMPANY_LEADERBOARD_BEGIN: 'READ_RECRUITER_COMPANY_LEADERBOARD_BEGIN',
  READ_COMPANY_LEADERBOARD_SUCCESS: 'READ_RECRUITER_COMPANY_LEADERBOARD_SUCCESS',
  SET_CUSTOM_DATE: 'SET_RECRUITER_CUSTOM_DATE',
  READ_RECRUITER_PERF_BEGIN: 'READ_RECRUITER_PERF_BEGIN',
  READ_RECRUITER_PERF_SUCCESS: 'READ_RECRUITER_PERF_SUCCESS',
  READ_RECRUITER_USER_SUCCESS: 'READ_RECRUITER_USER_SUCCESS',

  SET_RECRUITER_PERF_CUSTOM_DATE: 'SET_RECRUITER_PERF_CUSTOM_DATE',
  SET_MODAL_VISIBILITY: 'SET_MODAL_VISIBILITY',
  READ_AUTH_USER_WEEK_SUMMARY_SUCCESS: 'READ_AUTH_USER_WEEK_SUMMARY_SUCCESS',

  READ_PLACEMENT_STARTING_SOON_BEGIN: 'READ_PLACEMENT_STARTING_SOON_BEGIN',
  READ_PLACEMENT_STARTING_SOON_SUCCESS: 'READ_PLACEMENT_STARTING_SOON_SUCCESS',

  setCustomDateRangeAction: data => {
    return {
      type: actions.SET_CUSTOM_DATE,
      data,
    };
  },
  setModalVisibilityAction: data => {
    return {
      type: actions.SET_MODAL_VISIBILITY,
      data,
    };
  },
  readRecruiterUserSuccess: data => {
    return {
      type: actions.READ_RECRUITER_USER_SUCCESS,
      data,
    };
  },

  readAccountSummarySuccess: data => {
    return {
      type: actions.READ_ACCOUNT_SUMMARY_SUCCESS,
      data,
    };
  },

  readMonthlySummarySuccess: data => {
    return {
      type: actions.READ_MONTHLY_SUMMARY_SUCCESS,
      data,
    };
  },

  readWeeklySummarySuccess: data => {
    return {
      type: actions.READ_WEEKLY_SUMMARY_SUCCESS,
      data,
    };
  },

  readWeeklySalesTargetSuccess: data => {
    return {
      type: actions.READ_WEEKLY_SALES_TARGET_SUCCESS,
      data,
    };
  },

  readContractorsEndingSuccess: data => {
    return {
      type: actions.READ_CONTRACTORS_ENDING_SUCCESS,
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

  readTextusSuccess: data => {
    return {
      type: actions.READ_TEXTUS_SUCCESS,
      data,
    };
  },

  readVoipSuccess: data => {
    return {
      type: actions.READ_VOIP_SUCCESS,
      data,
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

  setRecruiterPerfCustomDateAction: data => {
    return {
      type: actions.SET_RECRUITER_PERF_CUSTOM_DATE,
      data,
    };
  },
  readRecruiterPerformanceBegin: () => {
    return {
      type: actions.READ_RECRUITER_PERF_BEGIN,
    };
  },
  readRecruiterPerformanceSuccess: data => {
    return {
      type: actions.READ_RECRUITER_PERF_SUCCESS,
      data,
    };
  },
  readAuthUserWeeklySummary: data => {
    return {
      type: actions.READ_AUTH_USER_WEEK_SUMMARY_SUCCESS,
      data,
    };
  },
  readPlacementStartingSoonBegin: () => {
    return { type: actions.READ_PLACEMENT_STARTING_SOON_BEGIN };
  },
  readPlacementStartingSoonSuccess: data => {
    return { type: actions.READ_PLACEMENT_STARTING_SOON_SUCCESS, data };
  },
};

export default actions;
