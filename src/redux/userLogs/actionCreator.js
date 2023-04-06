import actions from './actions';
import { getUserLogsApi } from './api';

const { readUserLogsBegin, readUserLogsSuccess, readUserLogsErr } = actions;

const getUserLogs = () => {
  return async dispatch => {
    try {
      dispatch(readUserLogsBegin());
      const res = await getUserLogsApi();
      dispatch(readUserLogsSuccess(res.data));
    } catch (err) {
      dispatch(readUserLogsErr(err.data?.message));
    }
  };
};

export { getUserLogs };
