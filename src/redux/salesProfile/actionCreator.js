import moment from 'moment';
import actions from './actions';
import {
  getAccountSummaryApi,
  getMonthlySummaryApi,
  getWeeklySummaryApi,
  getWeeklySalesTargetApi,
  getContractorsEndingApi,
  getSpreadHistoryApi,
  getTextusApi,
  getVoipApi,
  getSalesPerformanceApi,
  getSaleUsersApi,
  getPlacementStartingSoonApi,
} from './api';
import { performance } from '../../demoData/dashboardChartContent.json';
import { getPlacementDetailsApi } from '../companyOverview/api';

const {
  readAccountSummarySuccess,
  readMonthlySummarySuccess,
  readWeeklySummarySuccess,
  readWeeklySalesTargetSuccess,
  readContractorsEndingSuccess,
  readSpreadHistoryBegin,
  readSpreadHistorySuccess,
  readTextusSuccess,
  readVoipSuccess,
  setSalesPerfCustomDateAction,
  readSalesPerformanceBegin,
  readSalesPerformanceSuccess,
  readSaleUserSuccess,
  setModalVisibilityAction,
  readAuthUserWeeklySummary,
  readPlacementStartingSoonBegin,
  readPlacementStartingSoonSuccess,
} = actions;

const setSalesPerfCustomDateRange = selected => {
  return async dispatch => {
    const selectedDate = {};
    selectedDate.startDate = moment(selected.startDate)
      .utc()
      .toDate();
    selectedDate.endDate = moment(selected.endDate)
      .utc()
      .toDate();

    dispatch(setSalesPerfCustomDateAction(selected));
  };
};

const getSaleUsers = param => {
  return async dispatch => {
    const data = await getSaleUsersApi(param);
    dispatch(readSaleUserSuccess(data.data));
  };
};
const getAccountSummary = ({ email }) => {
  return async dispatch => {
    const data = await getAccountSummaryApi({ email });
    dispatch(readAccountSummarySuccess(data.data));
  };
};

const getMonthlySummary = ({ email }) => {
  return async dispatch => {
    const data = await getMonthlySummaryApi({ email });
    dispatch(readMonthlySummarySuccess(data.data));
  };
};

const getWeeklySummary = ({ email }) => {
  return async dispatch => {
    const data = await getWeeklySummaryApi({ email });
    // console.log('getWeeklySummary', data);
    dispatch(readWeeklySummarySuccess(data.data));
  };
};
const getAuthUserWeeklySummary = ({ email }) => {
  return async dispatch => {
    const data = await getWeeklySummaryApi({ email });
    // console.log('getWeeklySummary', data);
    dispatch(readAuthUserWeeklySummary(data.data));
  };
};

const getWeeklySalesTarget = ({ email }) => {
  return async dispatch => {
    const data = await getWeeklySalesTargetApi({
      email,
    });
    // console.log('getWeeklySalesTarget', data);
    dispatch(readWeeklySalesTargetSuccess(data.data));
  };
};

const getTextusData = ({ email }) => {
  return async dispatch => {
    const data = await getTextusApi({ email });
    // console.log('getTextus', data);
    dispatch(readTextusSuccess(data.data));
  };
};

const getContractorsEnding = ({ email }) => {
  return async dispatch => {
    const data = await getContractorsEndingApi({ email });
    // console.log('getContractorsEnding', data);
    dispatch(readContractorsEndingSuccess(data.data));
  };
};

const getSpreadHistory = ({ email, directPlacement }) => {
  return async dispatch => {
    dispatch(readSpreadHistoryBegin());
    const data = await getSpreadHistoryApi({ email, directPlacement });
    // console.log('getSpreadHistory', data);
    dispatch(readSpreadHistorySuccess(data.data));
  };
};

const getStartEndDateSalesPerf = (period, customDate) => {
  let endDate =
    moment
      .utc()
      .startOf('day')
      .unix() * 1000;
  let startDate;
  let prevStartDate;
  let prevEndDate;

  switch (period) {
    case 'year':
      startDate =
        moment
          .utc()
          .startOf('year')
          .unix() * 1000;
      prevStartDate =
        moment
          .utc()
          .subtract(1, 'years')
          .startOf('year')
          .unix() * 1000;
      prevEndDate =
        moment()
          .subtract(1, 'years')
          .utc()
          .startOf('day')
          .unix() * 1000;
      break;
    case 'month':
      startDate =
        moment
          .utc()
          .startOf('month')
          .unix() * 1000;
      prevStartDate =
        moment
          .utc()
          .subtract(1, 'months')
          .startOf('month')
          .unix() * 1000;
      prevEndDate =
        moment()
          .subtract(1, 'months')
          .utc()
          .startOf('day')
          .unix() * 1000;
      break;
    case 'week':
      startDate =
        moment
          .utc()
          .startOf('week')
          .unix() * 1000;
      endDate =
        moment
          .utc()
          .endOf('week')
          .unix() * 1000;
      prevEndDate =
        moment
          .utc()
          .subtract(1, 'weeks')
          .endOf('week')
          .unix() * 1000;
      prevStartDate =
        moment
          .utc()
          .subtract(1, 'weeks')
          .startOf('week')
          .unix() * 1000;
      break;
    case 'custom':
      startDate =
        moment(customDate.startDate)
          .utc()
          .unix() * 1000;
      endDate =
        moment(customDate.endDate)
          .utc()
          .unix() * 1000;
      prevEndDate =
        moment()
          .add(5, 'days')
          .utc()
          .unix() * 1000;
      prevStartDate =
        moment()
          .add(5, 'days')
          .utc()
          .unix() * 1000;
      break;
    default:
      startDate =
        moment()
          .add(-7, 'days')
          .utc()
          .unix() * 1000;
  }

  return {
    endDate,
    startDate,
    prevStartDate,
    prevEndDate,
  };
};

const getSalesPerformance = (period, category, customDate, email) => {
  return async dispatch => {
    const params = getStartEndDateSalesPerf(period, customDate);
    params.category = category;
    params.period = period === 'custom' ? 'day' : period;
    params.email = email;

    dispatch(readSalesPerformanceBegin());
    const data = await getSalesPerformanceApi(params);
    if (period === 'custom') {
      data.data.labels = data.data[category].timesheets;
    } else {
      data.data.labels = performance[period].labels;
    }
    dispatch(readSalesPerformanceSuccess(data.data));
  };
};

const getVoipData = ({ username }) => {
  return async dispatch => {
    const data = await getVoipApi({ user: username });
    // console.log('getVoip', data);
    dispatch(readVoipSuccess(data.data));
  };
};

const setModalVisibility = visibility => {
  return dispatch => {
    dispatch(setModalVisibilityAction(visibility));
  };
};

const getPlacementStartingSoon = email => {
  return async dispatch => {
    dispatch(readPlacementStartingSoonBegin());
    const data = await getPlacementStartingSoonApi({ email });
    dispatch(readPlacementStartingSoonSuccess(data.data));
  };
};

export {
  getAccountSummary,
  getMonthlySummary,
  getWeeklySummary,
  getWeeklySalesTarget,
  getContractorsEnding,
  getSpreadHistory,
  getTextusData,
  getVoipData,
  setSalesPerfCustomDateRange,
  getSalesPerformance,
  getSaleUsers,
  setModalVisibility,
  getAuthUserWeeklySummary,
  getPlacementStartingSoon,
};
