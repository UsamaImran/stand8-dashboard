// Todo: Error Handling Need
import moment from 'moment';
import actions from './actions';

const {
  READ_ACCOUNT_SUMMARY_SUCCESS,
  READ_MONTHLY_SUMMARY_SUCCESS,
  READ_WEEKLY_SUMMARY_SUCCESS,
  READ_TEXTUS_SUCCESS,
  READ_VOIP_SUCCESS,
  READ_CONTRACTORS_ENDING_SUCCESS,
  READ_WEEKLY_SALES_TARGET_SUCCESS,
  READ_SPREAD_HISTORY_BEGIN,
  READ_SPREAD_HISTORY_SUCCESS,
  READ_COMPANY_LEADERBOARD_BEGIN,
  READ_COMPANY_LEADERBOARD_SUCCESS,
  SET_CUSTOM_DATE,
  SET_RECRUITER_PERF_CUSTOM_DATE,
  READ_RECRUITER_PERF_BEGIN,
  READ_RECRUITER_PERF_SUCCESS,
  READ_RECRUITER_USER_SUCCESS,
  SET_MODAL_VISIBILITY,
  READ_AUTH_USER_WEEK_SUMMARY_SUCCESS,
  READ_PLACEMENT_STARTING_SOON_BEGIN,
  READ_PLACEMENT_STARTING_SOON_SUCCESS,
} = actions;

const initState = {
  isModalVisible: true,
  accountSummary: null,
  monthlySummary: null,
  weeklySummary: null,
  weeklySalesTarget: null,
  contractorsEnding: null,
  spreadHistoryLoading: false,
  spreadHistory: null,
  textusData: null,
  voipData: null,
  recruiterUserData: [],
  companyLBdataLoading: false,
  companyLBdata: null,
  customDateRange: {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selectionDate',
  },
  salesPerfDataLoading: false,
  salesPerfData: null,
  salesPerfCustomDateRange: {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selectionDate',
  },

  placementStartingSoonLoading: false,
  placementStartingSoonData: [],
};

const salesProfileReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_CUSTOM_DATE:
      return {
        ...state,
        customDateRange: data,
      };
    case READ_RECRUITER_USER_SUCCESS: {
      return {
        ...state,
        recruiterUserData: data,
      };
    }
    case READ_ACCOUNT_SUMMARY_SUCCESS:
      return {
        ...state,
        accountSummary: data,
      };
    case READ_MONTHLY_SUMMARY_SUCCESS:
      return {
        ...state,
        monthlySummary: data,
      };
    case READ_WEEKLY_SUMMARY_SUCCESS:
      return {
        ...state,
        weeklySummary: data,
      };
    case READ_WEEKLY_SALES_TARGET_SUCCESS:
      return {
        ...state,
        weeklySalesTarget: data,
      };
    case READ_TEXTUS_SUCCESS:
      return {
        ...state,
        textusData: data,
      };
    case READ_CONTRACTORS_ENDING_SUCCESS:
      return {
        ...state,
        contractorsEnding: data,
      };
    case READ_SPREAD_HISTORY_BEGIN:
      return {
        ...state,
        spreadHistoryLoading: true,
      };
    case READ_SPREAD_HISTORY_SUCCESS:
      return {
        ...state,
        spreadHistory: data,
        spreadHistoryLoading: false,
      };
    case READ_VOIP_SUCCESS:
      return {
        ...state,
        voipData: data,
      };
    case READ_COMPANY_LEADERBOARD_BEGIN:
      return {
        ...state,
        companyLBdataLoading: true,
      };
    case READ_COMPANY_LEADERBOARD_SUCCESS:
      return {
        ...state,
        companyLBdata: data,
        companyLBdataLoading: false,
      };

    case SET_RECRUITER_PERF_CUSTOM_DATE:
      return {
        ...state,
        salesPerfCustomDateRange: data,
      };
    case READ_RECRUITER_PERF_BEGIN:
      return {
        ...state,
        salesPerfDataLoading: true,
      };
    case READ_RECRUITER_PERF_SUCCESS:
      return {
        ...state,
        salesPerfData: data,
        salesPerfDataLoading: false,
      };
    case SET_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: data,
      };
    case READ_AUTH_USER_WEEK_SUMMARY_SUCCESS:
      return {
        ...state,
        authUserWeeklySummary: data,
      };
    case READ_PLACEMENT_STARTING_SOON_BEGIN:
      return {
        ...state,
        placementStartingSoonLoading: true,
      };

    case READ_PLACEMENT_STARTING_SOON_SUCCESS:
      return {
        ...state,
        placementStartingSoonData: data,
      };
    default:
      return state;
  }
};
export default salesProfileReducer;
