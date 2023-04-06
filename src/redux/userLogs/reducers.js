import actions from './actions';

const { READ_USERLOGS_BEGIN, READ_USERLOGS_SUCCESS, READ_USERLOGS_ERR } = actions;

const initialState = {
  isLoading: true,
  userLogs: [],
  error: null,
};

const userLogsReducer = (state = initialState, action) => {
  const { type, data, err } = action;

  switch (type) {
    case READ_USERLOGS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case READ_USERLOGS_SUCCESS:
      return {
        ...state,
        userLogs: data,
        isLoading: false,
      };

    case READ_USERLOGS_ERR:
      return {
        ...state,
        error: err,
        isLoading: false,
      };

    default:
      return state;
  }
};

export { userLogsReducer };
