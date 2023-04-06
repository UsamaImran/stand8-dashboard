import moment from 'moment';
import actions from './actions';

import {
  getCompanyLeaderboardApi,
  getCompanyRevenueApi,
  getHiringRevenueApi,
  getCompanyOverviewApi,
  getSpreadHistoryApi,
  getTopPerformersApi,
  getPerformersDetailsApi,
  getPlacementDetailsApi,
} from './api';

const {
  readCompanyLBBegin,
  readCompanyLBSuccess,
  setCustomDateRangeAction,
  readCompanyRevenueBegin,
  readCompanyRevenueSuccess,
  setRevenueCustomDateRangeAction,
  readHiringRevenueBegin,
  readHiringRevenueSuccess,
  setHiringRevenueCustomDateRangeAction,
  getCompanyOverviewBegin,
  getCompanyOverviewSuccess,
  getCompanyOverviewErr,
  readTopPerformersBegin,
  readTopPerformersSuccess,
  readSpreadHistoryBegin,
  readSpreadHistorySuccess,
  readPerformersDetailsBegin,
  readPerformersDetailsSuccess,
  readPlacementDetailsBegin,
  readPlacementDetailsSuccess,
} = actions;

const getCompanyOverview = (startDate, endDate) => {
  return async dispatch => {
    try {
      dispatch(getCompanyOverviewBegin());

      const res = await getCompanyOverviewApi({ startDate, endDate });

      dispatch(getCompanyOverviewSuccess(res.data));
    } catch (err) {
      dispatch(getCompanyOverviewErr(err));
    }
  };
};

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

const getStartEndDateForCompanySpread = (period, customDate) => {
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
          .startOf('week')
          .add(1, 'day')
          .utc()
          .startOf('day')
          .unix() * 1000;

      previousEndDate = startDate;
      previousStartDate =
        moment(previousEndDate)
          .subtract(1, 'week')
          .startOf('week')
          .add(1, 'day')
          .utc()
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

const getCompanyLeaderboard = (period, category, customDate, { isSales }) => {
  return async dispatch => {
    const params = getStartEndDateForCompanySpread(period, customDate);
    params.category = category;
    if (isSales) {
      params.isSales = isSales;
    }

    dispatch(readCompanyLBBegin());

    const data = await getCompanyLeaderboardApi(params);

    dispatch(readCompanyLBSuccess(data.data));
  };
};

const setRevenueCustomDateRange = selected => {
  const selectedDate = {};
  return async dispatch => {
    selectedDate.startDate = moment(selected.startDate)
      .utc()
      .toDate();
    selectedDate.endDate = moment(selected.endDate)
      .utc()
      .toDate();

    dispatch(setRevenueCustomDateRangeAction(selected));
  };
};

const getCompanyRevenue = (period, customDate) => {
  return async dispatch => {
    const params = getStartEndDate(period, customDate);

    dispatch(readCompanyRevenueBegin());

    const data = await getCompanyRevenueApi(params);

    dispatch(readCompanyRevenueSuccess(data.data));
  };
};

const setHiringRevenueCustomDateRange = selected => {
  const selectedDate = {};
  return async dispatch => {
    selectedDate.startDate = moment(selected.startDate)
      .utc()
      .toDate();
    selectedDate.endDate = moment(selected.endDate)
      .utc()
      .toDate();

    dispatch(setHiringRevenueCustomDateRangeAction(selected));
  };
};

const getHiringRevenue = (period, customDate) => {
  return async dispatch => {
    const params = getStartEndDateForCompanySpread(period, customDate);
    dispatch(readHiringRevenueBegin());
    const data = await getHiringRevenueApi(params);
    dispatch(readHiringRevenueSuccess(data.data));
  };
};

const getTopPerformers = role => {
  return async dispatch => {
    dispatch(readTopPerformersBegin());

    const params = {
      role,
    };
    const data = await getTopPerformersApi(params);

    dispatch(readTopPerformersSuccess(data.data));
  };
};

const getPerformanceDetails = (role, dateRange) => {
  return async dispatch => {
    dispatch(readPerformersDetailsBegin());
    const { startDate, endDate } = getStartEndDate(dateRange);
    const params = {
      role,
      startDate,
      endDate,
    };
    const data = await getPerformersDetailsApi(params);
    dispatch(readPerformersDetailsSuccess(data.data));
  };
};

const getSpreadHistory = ({ directPlacement }) => {
  return async dispatch => {
    dispatch(readSpreadHistoryBegin());
    const data = await getSpreadHistoryApi({ directPlacement });
    dispatch(readSpreadHistorySuccess(data.data));
  };
};

const getPlacementDetails = (startDate, endDate) => {
  return async dispatch => {
    dispatch(readPlacementDetailsBegin());
    const data = await getPlacementDetailsApi({ startDate, endDate });
    dispatch(readPlacementDetailsSuccess(data.data));
  };
};

export {
  setCustomDateRange,
  getCompanyLeaderboard,
  setRevenueCustomDateRange,
  getCompanyRevenue,
  setHiringRevenueCustomDateRange,
  getHiringRevenue,
  getCompanyOverview,
  getTopPerformers,
  getSpreadHistory,
  getPerformanceDetails,
  getPlacementDetails,
};
