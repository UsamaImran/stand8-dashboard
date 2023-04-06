import moment from 'moment';
import actions from './actions';
import { getRecruiterAlignmentApi, getRecruiterAssignmentsApi } from './api';

const {
  readRecruitersAlignmentBegin,
  readRecruitersAlignmentSuccess,
  readRecruitersAlignmentErr,
  readRecruitersAssignmentsBegin,
  readRecruitersAssignmentsSuccess,
  readRecruitersAssignmentsErr,
} = actions;

const getRecruiterAlignment = () => {
  return async dispatch => {
    try {
      dispatch(readRecruitersAlignmentBegin());
      const data = await getRecruiterAlignmentApi();
      return dispatch(readRecruitersAlignmentSuccess(data.data));
    } catch (err) {
      return dispatch(readRecruitersAlignmentErr(err.data));
    }
  };
};

const getRecruiterAssignments = (dateRange, data) => {
  const startDate =
    moment(dateRange.startDate)
      .startOf('day')
      .unix() * 1000;

  const endDate =
    moment(dateRange.endDate)
      .endOf('day')
      .unix() * 1000;

  const params = {
    startDate,
    endDate,
    data,
  };

  return async dispatch => {
    try {
      dispatch(readRecruitersAssignmentsBegin());
      const res = await getRecruiterAssignmentsApi(params);
      return dispatch(readRecruitersAssignmentsSuccess(res.data));
    } catch (err) {
      return dispatch(readRecruitersAssignmentsErr(err.data));
    }
  };
};

export { getRecruiterAlignment, getRecruiterAssignments };
