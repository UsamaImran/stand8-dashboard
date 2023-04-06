import actions from './actions';

const initialState = {
  date: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selectionDate',
  },
  time: {
    startTime: '00:00',
    endTime: '24:00',
    key: 'selectionTime',
  },
};

const { SET_DATE, SET_TIME } = actions;

const pageFilterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DATE:
      return {
        ...state,
        date: payload,
      };

    case SET_TIME:
      return {
        ...state,
        time: payload,
      };
    default:
      return state;
  }
};

export default pageFilterReducer;
