import moment from 'moment';
import actions from './actions';

import { getSalesUsersApi } from './api';

const { readSalesUserBegin, readSalesUserSuccess } = actions;

const getSpreadDateRange = rangeText => {
  let startDate;
  let endDate;

  switch (rangeText) {
    case 'ytd':
      startDate =
        moment
          .utc()
          .startOf('year')
          .startOf('day')
          .unix() * 1000;
      endDate = moment.utc().unix() * 1000;
      break;

    case 'q1':
      startDate =
        moment
          .utc()
          .startOf('year')
          .startOf('day')
          .unix() * 1000;
      endDate =
        moment
          .utc()
          .month(2)
          .endOf('month')
          .endOf('day')
          .unix() * 1000;
      break;

    case 'q2':
      startDate =
        moment
          .utc()
          .month(3)
          .startOf('month')
          .startOf('day')
          .unix() * 1000;
      endDate =
        moment
          .utc()
          .month(5)
          .endOf('month')
          .endOf('day')
          .unix() * 1000;
      break;

    case 'q3':
      startDate =
        moment
          .utc()
          .month(6)
          .startOf('month')
          .startOf('day')
          .unix() * 1000;
      endDate =
        moment
          .utc()
          .month(8)
          .endOf('month')
          .endOf('day')
          .unix() * 1000;
      break;

    case 'q4':
      startDate =
        moment
          .utc()
          .month(9)
          .startOf('month')
          .startOf('day')
          .unix() * 1000;
      endDate =
        moment
          .utc()
          .month(11)
          .endOf('month')
          .endOf('day')
          .unix() * 1000;
      break;

    default:
      startDate =
        moment
          .utc()
          .startOf('year')
          .startOf('day')
          .unix() * 1000;
      endDate = moment.utc().unix() * 1000;
      break;
  }

  return {
    spreadRangeStart: startDate,
    spreadRangeEnd: endDate,
  };
};

const getWeekDateRange = date => {
  const startDate =
    moment(date)
      .utc()
      .startOf('week')
      .startOf('day')
      .unix() * 1000;
  const endDate =
    moment(date)
      .utc()
      .endOf('week')
      .endOf('day')
      .unix() * 1000;

  return {
    weekRangeStart: startDate,
    weekRangeEnd: endDate,
  };
};

const getSalesUsers = (weekDate, spreadDate) => {
  return async dispatch => {
    const spreadRange = getSpreadDateRange(spreadDate);
    const weekRange = getWeekDateRange(weekDate);

    const params = {
      ...spreadRange,
      ...weekRange,
    };

    dispatch(readSalesUserBegin());
    const data = await getSalesUsersApi(params);
    dispatch(readSalesUserSuccess(data.data));
  };
};

export { getSalesUsers };
