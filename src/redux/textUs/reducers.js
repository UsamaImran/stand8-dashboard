import moment from 'moment';
import actions from './actions';
import { performance } from '../../demoData/dashboardChartContent.json';

export const INDEX_PAGE_SIZE_DEFAULT = 10;
export const INDEX_PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 50, 100];

const initialState = {
  performanceData: performance.week,
  perLoading: false,
  textUsUsersData: null,
  tuLoading: false,
  textUsOneUsersData: null,
  touLoading: false,
  textUsOverviewData: null,
  toLoading: false,
  error: null,
  dateRange: {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selectionDate',
  },
};

const {
  PERFORMANCE_BEGIN,
  PERFORMANCE_SUCCESS,
  PERFORMANCE_ERR,

  UPDATE_LOADING_BEGIN,
  UPDATE_LOADING_SUCCESS,
  UPDATE_LOADING_ERR,

  // TextUs Users Data
  TEXTUSUSERS_BEGIN,
  TEXTUSUSERS_SUCCESS,
  TEXTUSUSERS_ERR,

  // TextUs One Users Data
  TEXTUS_ONE_USERS_BEGIN,
  TEXTUS_ONE_USERS_SUCCESS,
  TEXTUS_ONE_USERS_ERR,

  // TextUs Overview Data
  TEXTUSOVERVIEW_BEGIN,
  TEXTUSOVERVIEW_SUCCESS,
  TEXTUSOVERVIEW_ERR,

  SET_DATE,
} = actions;

const textUsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SET_DATE:
      return {
        ...state,
        dateRange: data,
      };
    // TextUs Users Data
    case TEXTUSUSERS_BEGIN:
      return {
        ...state,
        tuLoading: true,
      };
    case TEXTUSUSERS_SUCCESS:
      return {
        ...state,
        textUsUsersData: data.data,
        tuLoading: false,
      };
    case TEXTUSUSERS_ERR:
      return {
        ...state,
        error: err,
        tuLoading: false,
      };

    // TextUs One Users Data
    case TEXTUS_ONE_USERS_BEGIN:
      return {
        ...state,
        touLoading: true,
      };
    case TEXTUS_ONE_USERS_SUCCESS:
      return {
        ...state,
        textUsOneUsersData: data.data,
        touLoading: false,
      };
    case TEXTUS_ONE_USERS_ERR:
      return {
        ...state,
        error: err,
        touLoading: false,
      };

    // TextUs overview Data
    case TEXTUSOVERVIEW_BEGIN:
      return {
        ...state,
        toLoading: true,
      };

    case TEXTUSOVERVIEW_SUCCESS:
      return {
        ...state,
        textUsOverviewData: data,
        toLoading: false,
      };
    case TEXTUSOVERVIEW_ERR:
      return {
        ...state,
        error: err,
        toLoading: false,
      };

    case UPDATE_LOADING_BEGIN:
      return {
        ...state,
        perLoading: true,
      };

    case UPDATE_LOADING_SUCCESS:
      return {
        ...state,
        perLoading: false,
      };
    case UPDATE_LOADING_ERR:
      return {
        ...state,
        error: err,
        perLoading: false,
      };

    case PERFORMANCE_BEGIN:
      return {
        ...state,
        perLoading: true,
      };
    case PERFORMANCE_SUCCESS:
      return {
        ...state,
        performanceData: data,
        perLoading: false,
      };
    case PERFORMANCE_ERR:
      return {
        ...state,
        error: err,
        perLoading: false,
      };

    default:
      return state;
  }
};

export default textUsReducer;
