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
  READ_SALES_PERF_BEGIN,
  READ_SALES_PERF_SUCCESS,
  SET_SALES_PERF_CUSTOM_DATE,
  READ_SALES_USER_SUCCESS,
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
  authUserWeeklySummary: null,
  weeklySalesTarget: null,
  contractorsEnding: null,
  spreadHistoryLoading: false,
  spreadHistory: null,
  textusData: null,
  voipData: null,
  salesPerfDataLoading: false,
  salesPerfData: null,
  saleUserData: [],
  customDateRange: {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selectionDate',
  },
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
    case SET_SALES_PERF_CUSTOM_DATE:
      return {
        ...state,
        salesPerfCustomDateRange: data,
      };
    case READ_SALES_USER_SUCCESS: {
      return {
        ...state,
        saleUserData: data,
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
    case READ_SALES_PERF_BEGIN:
      return {
        ...state,
        salesPerfDataLoading: true,
      };
    case READ_SALES_PERF_SUCCESS:
      return {
        ...state,
        salesPerfData: data,
        salesPerfDataLoading: false,
      };
    case READ_VOIP_SUCCESS:
      return {
        ...state,
        voipData: data,
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
        placementStartingSoonLoading: false,
      };
    default:
      return state;
  }
};
export default salesProfileReducer;
