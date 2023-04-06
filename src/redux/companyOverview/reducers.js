import moment from 'moment';
import actions from './actions';

const {
  READ_COMPANY_LEADERBOARD_BEGIN,
  READ_COMPANY_LEADERBOARD_SUCCESS,
  SET_CUSTOM_DATE,

  READ_COMPANY_REVENUE_BEGIN,
  READ_COMPANY_REVENUE_SUCCESS,
  SET_REVENUE_CUSTOM_DATE,

  READ_HIRING_REVENUE_BEGIN,
  READ_HIRING_REVENUE_SUCCESS,
  SET_HIRING_REVENUE_CUSTOM_DATE,

  COMPANY_OVERVIEW_BEGIN,
  COMPANY_OVERVIEW_SUCCESS,
  COMPANY_OVERVIEW_ERR,

  READ_TOP_PERFORMERS_BEGIN,
  READ_TOP_PERFORMERS_SUCCESS,

  READ_SPREAD_HISTORY_BEGIN,
  READ_SPREAD_HISTORY_SUCCESS,

  READ_PERFORMERS_DETAILS_BEGIN,
  READ_PERFORMERS_DETAILS_SUCCESS,

  READ_PLACEMENT_DETAILS_BEGIN,
  READ_PLACEMENT_DETAILS_SUCCESS,
} = actions;

const initState = {
  companyOverview: null,
  companyOverviewLoading: false,
  companyOverviewErr: null,
  companyLBdataLoading: false,
  companyLBdata: null,
  customDateRange: {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selectionDate',
  },

  revenueDataLoading: false,
  revenueData: null,
  revenueCustomDateRange: {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selectionDate',
  },

  hiringRevenueDataLoading: false,
  hiringRevenueData: null,
  hiringRevenueCustomDateRange: {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selectionDate',
  },

  topPerformers: null,
  topPerformersLoading: false,

  spreadHistoryLoading: false,
  spreadHistory: null,

  performersDetails: null,
  performersDetailsLoading: false,

  placementDetails: [],
  placementDetailsLoading: false,
};

const companyOverviewReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case COMPANY_OVERVIEW_BEGIN:
      return {
        ...state,
        companyOverviewLoading: true,
      };
    case COMPANY_OVERVIEW_SUCCESS:
      return {
        ...state,
        companyOverview: data,
        companyOverviewLoading: false,
      };
    case COMPANY_OVERVIEW_ERR:
      return {
        ...state,
        companyOverviewErr: err,
        companyOverviewLoading: false,
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
    case SET_CUSTOM_DATE:
      return {
        ...state,
        customDateRange: data,
      };

    case READ_COMPANY_REVENUE_BEGIN:
      return {
        ...state,
        revenueDataLoading: true,
      };
    case READ_COMPANY_REVENUE_SUCCESS:
      return {
        ...state,
        revenueData: data,
        revenueDataLoading: false,
      };
    case SET_REVENUE_CUSTOM_DATE:
      return {
        ...state,
        revenueCustomDateRange: data,
      };

    case READ_HIRING_REVENUE_BEGIN:
      return {
        ...state,
        hiringRevenueDataLoading: true,
      };
    case READ_HIRING_REVENUE_SUCCESS:
      return {
        ...state,
        hiringRevenueData: data,
        hiringRevenueDataLoading: false,
      };
    case SET_HIRING_REVENUE_CUSTOM_DATE:
      return {
        ...state,
        hiringRevenueCustomDateRange: data,
      };

    case READ_TOP_PERFORMERS_BEGIN:
      return {
        ...state,
        topPerformersLoading: true,
      };
    case READ_TOP_PERFORMERS_SUCCESS:
      return {
        ...state,
        topPerformers: data,
        topPerformersLoading: false,
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
    case READ_PERFORMERS_DETAILS_BEGIN:
      return {
        ...state,
        performersDetailsLoading: true,
      };
    case READ_PERFORMERS_DETAILS_SUCCESS:
      return {
        ...state,
        performersDetails: data,
        performersDetailsLoading: false,
      };

    case READ_PLACEMENT_DETAILS_BEGIN:
      return {
        ...state,
        placementDetailsLoading: true,
      };

    case READ_PLACEMENT_DETAILS_SUCCESS:
      return {
        ...state,
        placementDetails: data,
        placementDetailsLoading: false,
      };

    default:
      return state;
  }
};
export default companyOverviewReducer;
