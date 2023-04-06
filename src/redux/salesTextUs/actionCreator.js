import moment from 'moment';
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

const performanceGetData = email => {
  return async (dispatch, getState) => {
    const { week } = performance;

    const params = {
      period: 'week',
      timezone: getState().auth.user.timezone,
      email,
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

const performanceFilterData = (value, email) => {
  return async (dispatch, getState) => {
    const params = {
      period: value,
      timezone: getState().auth.user.timezone,
      email,
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
  return async dispatch => {
    try {
      const params = {
        startDate: moment()
          .utc()
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment()
          .utc()
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
      const textUsUsersData = await getAnalyticsEngagement(params);

      dispatch(textUsUsersBegin());
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

const textUsOneUserFilterData = (period, value, userName) => {
  return async dispatch => {
    try {
      const params = {
        startDate: moment(value.startDate)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(value.endDate)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        user_name: userName,
      };
      dispatch(textUsOneUsersBegin());
      const textUsUserData = await textUsOneUserApi(params);

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
  return async dispatch => {
    try {
      const params = {
        startDate: moment(value.startDate)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(value.endDate)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
      const textUsUsersData = await getAnalyticsEngagement(params);

      dispatch(textUsUsersBegin());
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

const textUsOverviewGetData = email => {
  return async (dispatch, getState) => {
    try {
      dispatch(textUsOverviewBegin());
      const analyticsOverviewData = await getAnalyticsOverview({
        timezone: getState().auth.user.timezone,
        email,
      });

      dispatch(textUsOverviewSuccess(analyticsOverviewData.data));
    } catch (err) {
      dispatch(textUsOverviewErr(err));
    }
  };
};

const onSetDate = selected => {
  return async (dispatch, getState) => {
    const timezone = getState().auth.user.timezone.replace('GMT', '');
    const selectedDate = {};
    selectedDate.startDate = moment(selected.startDate)
      .zone(timezone)
      .toDate();
    selectedDate.endDate = moment(selected.endDate)
      .zone(timezone)
      .toDate();

    // 1 day can't be selected because of the below code it always add 1 day to endDate if same as start
    // if (moment(selected.startDate).format('YYYY-MM-DD') == moment(selected.endDate).format('YYYY-MM-DD')) {
    //   selected.endDate = moment(selected.endDate).add(1, 'days').zone(timezone).toDate()
    // }

    dispatch(setDate(selected));
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
