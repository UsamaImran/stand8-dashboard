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
  getCompanyLeaderboardApi,
  getRecruiterPerformanceApi,
  getRecruiterUsersApi,
  // getCompanySpreadHistoryApi,
  getPlacementStartingSoonApi,
} from './api';
import { performance } from '../../demoData/dashboardChartContent.json';

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
  readCompanyLBBegin,
  readCompanyLBSuccess,
  setCustomDateRangeAction,
  setRecruiterPerfCustomDateAction,
  readRecruiterPerformanceBegin,
  readRecruiterPerformanceSuccess,
  readRecruiterUserSuccess,
  setModalVisibilityAction,
  readAuthUserWeeklySummary,
  readPlacementStartingSoonBegin,
  readPlacementStartingSoonSuccess,
} = actions;

const setCustomDateRange = selected => {
  return async dispatch => {
    const selectedDate = {};
    selectedDate.startDate = moment(selected.startDate)
      .utc()
      .toDate();
    selectedDate.endDate = moment(selected.endDate)
      .utc()
      .toDate();

    dispatch(setCustomDateRangeAction(selected));
  };
};

const getRecruiterUsers = params => {
  return async dispatch => {
    const data = await getRecruiterUsersApi(params);
    dispatch(readRecruiterUserSuccess(data.data));
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
    dispatch(readWeeklySummarySuccess(data.data));
  };
};

const getAuthUserWeeklySummary = ({ email }) => {
  return async dispatch => {
    const data = await getWeeklySummaryApi({ email });
    dispatch(readAuthUserWeeklySummary(data.data));
  };
};

const getWeeklySalesTarget = ({ email }) => {
  return async dispatch => {
    const data = await getWeeklySalesTargetApi({ email });
    dispatch(readWeeklySalesTargetSuccess(data.data));
  };
};

const getTextusData = ({ email }) => {
  return async dispatch => {
    const data = await getTextusApi({ email });
    dispatch(readTextusSuccess(data.data));
  };
};

const getContractorsEnding = ({ email }) => {
  return async dispatch => {
    const data = await getContractorsEndingApi({ email });
    dispatch(readContractorsEndingSuccess(data.data));
  };
};

const getSpreadHistory = ({ email, directPlacement }) => {
  return async dispatch => {
    dispatch(readSpreadHistoryBegin());
    const data = await getSpreadHistoryApi({ email, directPlacement });
    dispatch(readSpreadHistorySuccess(data.data));
  };
};

const getVoipData = ({ username }) => {
  return async dispatch => {
    const data = await getVoipApi({ user: username });
    dispatch(readVoipSuccess(data.data));
  };
};

const getStartEndDate = (period, customDate) => {
  let endDate =
    moment()
      .utc()
      .unix() * 1000;
  let startDate;
  let previousStartDate;
  let previousEndDate;

  switch (period) {
    case 'year':
      startDate =
        moment()
          .subtract(1, 'year')
          .utc()
          .startOf('day')
          .unix() * 1000;

      previousEndDate = startDate;
      previousStartDate =
        moment(previousEndDate)
          .subtract(1, 'year')
          .utc()
          .startOf('day')
          .unix() * 1000;

      break;
    case 'month':
      startDate =
        moment()
          .subtract(1, 'month')
          .utc()
          .startOf('day')
          .unix() * 1000;

      previousEndDate = startDate;
      previousStartDate =
        moment(previousEndDate)
          .subtract(1, 'month')
          .utc()
          .startOf('day')
          .unix() * 1000;

      break;
    case 'week':
      startDate =
        moment()
          .subtract(1, 'week')
          .utc()
          .startOf('day')
          .unix() * 1000;

      previousEndDate = startDate;
      previousStartDate =
        moment(previousEndDate)
          .subtract(1, 'week')
          .startOf('day')
          .unix() * 1000;

      break;
    case 'today':
      startDate =
        moment()
          .utc()
          .startOf('day')
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
      previousStartDate =
        moment(customDate.startDate)
          .utc()
          .unix() * 1000;
      previousEndDate =
        moment(customDate.endDate)
          .utc()
          .unix() * 1000;
      break;
    default:
      startDate =
        moment()
          .subtract(7, 'days')
          .utc()
          .unix() * 1000;
  }
  return {
    endDate,
    startDate,
    previousEndDate,
    previousStartDate,
  };
};

const getCompanyLeaderboard = (period, category, customDate) => {
  return async dispatch => {
    const params = getStartEndDate(period, customDate);
    params.category = category;
    dispatch(readCompanyLBBegin());

    const data = await getCompanyLeaderboardApi(params);

    dispatch(readCompanyLBSuccess(data.data));
  };
};

const setSalesPerfCustomDateRange = selected => {
  return async dispatch => {
    const selectedDate = {};
    selectedDate.startDate = moment(selected.startDate)
      .utc()
      .toDate();
    selectedDate.endDate = moment(selected.endDate)
      .utc()
      .toDate();

    dispatch(setRecruiterPerfCustomDateAction(selected));
  };
};

const getStartEndDateSalesPerf = (period, customDate) => {
  let endDate =
    moment
      .utc()
      .endOf('day')
      .unix() * 1000;
  let startDate;
  let prevStartDate;
  let prevEndDate;
  const diff = moment(customDate.endDate).diff(moment(customDate.startDate), 'days');

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
          .endOf('day')
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
          .endOf('day')
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
          .endOf('day')
          .unix() * 1000;

      prevEndDate =
        moment()
          .subtract(diff, 'days')
          .utc()
          .endOf('day')
          .unix() * 1000;
      prevStartDate =
        moment()
          .subtract(diff, 'days')
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
    params.period = period;
    params.email = email;

    dispatch(readRecruiterPerformanceBegin());
    const data = await getRecruiterPerformanceApi(params);
    if (period === 'custom') {
      data.data.labels = data.data[category].timesheets;
    } else {
      data.data.labels = performance[period].labels;
    }
    dispatch(readRecruiterPerformanceSuccess(data.data));
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
  setCustomDateRange,
  getAccountSummary,
  getMonthlySummary,
  getWeeklySummary,
  getWeeklySalesTarget,
  getContractorsEnding,
  getSpreadHistory,
  getTextusData,
  getVoipData,
  getCompanyLeaderboard,
  setSalesPerfCustomDateRange,
  getSalesPerformance,
  getRecruiterUsers,
  setModalVisibility,
  getAuthUserWeeklySummary,
  getPlacementStartingSoon,
};
