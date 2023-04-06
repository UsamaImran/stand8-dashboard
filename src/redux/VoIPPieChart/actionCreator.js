import moment from 'moment-timezone';
import { getVoipPieChartOverview, getVoipBarChartOverview, getVoipStatsPieChartOverview } from './api';
import actions from './actions';
import store from '../store';

const {
  voipPieChartBegin,
  voipPieChartSuccess,
  voipPieChartErr,
  voipBarChartBegin,
  voipBarChartSuccess,
  voipBarChartErr,
  voipCallStatisticsBegin,
  voipCallStatisticsSuccess,
  voipCallStatisticsErr,
} = actions;

const todayParams = {
  start_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .startOf('day')
    .unix(),
  end_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .endOf('day')
    .unix(),
  type: 'today',
};

const yesterdayParams = {
  start_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .subtract(1, 'd')
    .startOf('day')
    .unix(),
  end_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .subtract(1, 'd')
    .endOf('day')
    .unix(),
  type: 'yesterday',
};

const weekParams = {
  start_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .startOf('week')
    .unix(),
  end_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .endOf('day')
    .unix(),
  type: 'week',
};

const monthParams = {
  start_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .startOf('month')
    .unix(),
  end_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .endOf('day')
    .unix(),
  type: 'month',
};

const yearParams = {
  start_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .startOf('year')
    .unix(),
  end_date: moment()
    .tz(store.getState().auth?.user?.timezone || moment.tz.guess())
    .endOf('day')
    .unix(),
  type: 'year',
};

const getStartEndDate = value => {
  switch (value) {
    case 'today':
      return todayParams;
    case 'yesterday':
      return yesterdayParams;
    case 'week':
      return weekParams;
    case 'month':
      return monthParams;
    case 'year':
      return yearParams;
    default:
      return todayParams;
  }
};

const voipPieChartGetData = user => {
  return async dispatch => {
    try {
      if (user) {
        todayParams.user = user;
      } else {
        todayParams.user = null;
      }
      dispatch(voipPieChartBegin());
      const getVoipPieChartOverviewData = await getVoipPieChartOverview(todayParams);
      const voipPieChartOverviewData = {
        ...getVoipPieChartOverviewData,
      };

      dispatch(voipPieChartSuccess(voipPieChartOverviewData.data));
    } catch (err) {
      dispatch(voipPieChartErr(err));
    }
  };
};

const voipPieChartFilterData = (value, user) => {
  const params = getStartEndDate(value);
  if (user) {
    params.user = user;
  }
  return async dispatch => {
    try {
      dispatch(voipPieChartBegin());
      const getVoipPieChartOverviewData = await getVoipPieChartOverview(params);
      const voipPieChartOverviewData = {
        ...getVoipPieChartOverviewData,
      };
      dispatch(voipPieChartSuccess(voipPieChartOverviewData.data));
    } catch (err) {
      dispatch(voipPieChartErr(err));
    }
  };
};

const voipBarChartGetData = user => {
  return async dispatch => {
    try {
      if (user) {
        todayParams.user = user;
      } else {
        todayParams.user = null;
      }
      dispatch(voipBarChartBegin());
      const getVoipBarChartOverviewData = await getVoipBarChartOverview(todayParams);
      dispatch(voipBarChartSuccess(getVoipBarChartOverviewData.data));
    } catch (err) {
      dispatch(voipBarChartErr(err));
    }
  };
};

const voipBarChartFilterData = (value, user) => {
  const params = getStartEndDate(value);
  if (user) {
    params.user = user;
  }
  return async dispatch => {
    try {
      dispatch(voipBarChartBegin());
      const getVoipBarChartOverviewData = await getVoipBarChartOverview(params);
      dispatch(voipBarChartSuccess(getVoipBarChartOverviewData.data));
    } catch (err) {
      dispatch(voipBarChartErr(err));
    }
  };
};

const voipCallStatisticsData = (value, user) => {
  return async dispatch => {
    try {
      dispatch(voipCallStatisticsBegin());
      const params = { period: value };
      if (user) {
        params.user = user;
      }
      const response = await getVoipStatsPieChartOverview(params);
      dispatch(voipCallStatisticsSuccess(response.data));
    } catch (err) {
      dispatch(voipCallStatisticsErr(err));
    }
  };
};

export {
  voipPieChartFilterData,
  voipPieChartGetData,
  voipBarChartGetData,
  voipBarChartFilterData,
  voipCallStatisticsData,
};
