import moment from 'moment-timezone';
import actions from './actions';
import { getAnalyticsEngagement, getAnalyticsOverview, getAnalyticsCompanyWide, textUsOneUserApi } from './api';
import { performance } from '../../demoData/dashboardChartContent.json';

const {
  performanceBegin,
  performanceSuccess,
  performanceErr,

  updateLoadingBegin,
  updateLoadingSuccess,
  updateLoadingErr,

  textUsUsersBegin,
  textUsUsersSuccess,
  textUsUsersErr,

  textUsOverviewBegin,
  textUsOverviewSuccess,
  textUsOverviewErr,

  textUsOneUsersBegin,
  textUsOneUsersSuccess,
  textUsOneUsersErr,
  setDate,
} = actions;

const performanceGetData = () => {
  return async (dispatch, getState) => {
    const { week } = performance;

    const params = {
      period: 'week',
      timezone: getState().auth.user.timezone,
    };
    try {
      dispatch(performanceBegin());
      const CompanyWideData = await getAnalyticsCompanyWide(params);
      dispatch(performanceSuccess({ ...CompanyWideData.data, labels: week.labels }));
    } catch (err) {
      dispatch(performanceErr(err));
    }
  };
};

const performanceFilterData = value => {
  return async (dispatch, getState) => {
    const params = {
      period: value,
      timezone: getState().auth.user.timezone,
    };
    try {
      dispatch(performanceBegin());
      const CompanyWideData = await getAnalyticsCompanyWide(params);
      dispatch(performanceSuccess({ ...CompanyWideData.data, labels: performance[value].labels }));
    } catch (err) {
      dispatch(performanceErr(err));
    }
  };
};

const textUsUsersGetData = () => {
  return async (dispatch, getState) => {
    try {
      const params = {
        startDate: moment()
          .tz(getState().auth?.user?.timezone)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment()
          .tz(getState().auth?.user?.timezone)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
      };

      dispatch(textUsUsersBegin());
      const textUsUsersData = await getAnalyticsEngagement(params);
      setTimeout(() => {
        dispatch(
          textUsUsersSuccess({
            data: textUsUsersData.data,
          }),
        );
      }, 100);
    } catch (err) {
      dispatch(textUsUsersErr(err));
    }
  };
};

const textUsOneUserFilterData = (period, value) => {
  return async (dispatch, getState) => {
    try {
      const params = {
        startDate: moment(value.startDate)
          .tz(getState().auth?.user?.timezone)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(value.endDate)
          .tz(getState().auth?.user?.timezone)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
      params.user_name = 'Chris King';
      const textUsUserData = await textUsOneUserApi(params);

      dispatch(textUsOneUsersBegin());
      setTimeout(() => {
        dispatch(
          textUsOneUsersSuccess({
            data: textUsUserData.data,
          }),
        );
      }, 100);
    } catch (err) {
      dispatch(textUsOneUsersErr(err));
    }
  };
};

const textUsUsersFilterData = (period, value) => {
  return async (dispatch, getState) => {
    try {
      const params = {
        startDate: moment(value.startDate)
          .tz(getState().auth?.user?.timezone)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(value.endDate)
          .tz(getState().auth?.user?.timezone)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
      };

      dispatch(textUsUsersBegin());
      const textUsUsersData = await getAnalyticsEngagement(params);
      setTimeout(() => {
        dispatch(
          textUsUsersSuccess({
            data: textUsUsersData.data,
          }),
        );
      }, 100);
    } catch (err) {
      dispatch(textUsUsersErr(err));
    }
  };
};

const textUsOverviewGetData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(textUsOverviewBegin());
      const analyticsOverviewData = await getAnalyticsOverview({ timezone: getState().auth.user.timezone });
      dispatch(textUsOverviewSuccess(analyticsOverviewData.data));
    } catch (err) {
      dispatch(textUsOverviewErr(err));
    }
  };
};

const onSetDate = selected => {
  return async (dispatch, getState) => {
    const selectedDate = {};
    selectedDate.startDate = moment(selected.startDate)
      .tz(getState().auth?.user?.timezone)
      .toDate();
    selectedDate.endDate = moment(selected.endDate)
      .tz(getState().auth?.user?.timezone)
      .toDate();

    // 1 day can't be selected because of the below code it always add 1 day to endDate if same as start
    // if (moment(selected.startDate).format('YYYY-MM-DD') == moment(selected.endDate).format('YYYY-MM-DD')) {
    //   selected.endDate = moment(selected.endDate).add(1, 'days').tz(getState().auth?.user?.timezone).toDate()
    // }

    dispatch(setDate(selectedDate));
  };
};

const setIsLoading = () => {
  return async dispatch => {
    try {
      dispatch(updateLoadingBegin());
      setTimeout(() => {
        dispatch(updateLoadingSuccess());
      }, 100);
    } catch (err) {
      dispatch(updateLoadingErr(err));
    }
  };
};

export {
  textUsOneUserFilterData,
  textUsUsersGetData,
  textUsUsersFilterData,
  textUsOverviewGetData,
  setIsLoading,
  performanceFilterData,
  performanceGetData,
  onSetDate,
};
