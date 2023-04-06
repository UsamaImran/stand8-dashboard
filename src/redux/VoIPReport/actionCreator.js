import { get } from 'lodash';
import moment from 'moment-timezone';
import actions from './actions';
import { getReport } from './api';
import { getUnixTimestamp } from '../../utility/utility';
import store from '../store';

const { fetchDataInit, fetchDataSuccess, fetchDataFailure } = actions;
// const { setDate, setTime } = pageFilterActions;

/**
 * @params
 * created_from, created_to, paginate, page_size, breakdown, starttime, endtime
 */

const fetchData = username => {
  return async (dispatch, getState) => {
    const { date, time } = get(getState(), 'pageFilterReducer', { date: {}, time: {} });
    const startDate = `${moment(date.startDate).format('ddd MMM DD YYYY HH:mm:ss')} UTC`;
    const endDate = `${moment(date.endDate).format('ddd MMM DD YYYY HH:mm:ss')} UTC`;
    const selectedRangeStartDate = moment(startDate)
      .tz(store.getState().auth?.user?.timezone)
      .utc()
      .startOf('day')
      .format();
    const selectedRangeEndDate = moment(endDate)
      .tz(store.getState().auth?.user?.timezone)
      .utc()
      .endOf('day')
      .format();
    const currenttime = moment
      .tz(store.getState().auth?.user?.timezone)
      .utc()
      .unix();

    const params = {
      created_from: getUnixTimestamp(selectedRangeStartDate),
      created_to: getUnixTimestamp(selectedRangeEndDate),
      starttime: time.startTime,
      endtime: time.endTime,
      paginate: false,
      currenttime,
    };
    if (username) {
      params.user = username;
    }
    dispatch(fetchDataInit());
    try {
      const { data } = await getReport(params);
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};

export { fetchData };
