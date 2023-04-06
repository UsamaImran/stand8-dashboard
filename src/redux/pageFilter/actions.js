const actions = {
  SET_DATE: '[page filter] set selected date range',
  SET_TIME: '[page filter] set selected time range',
  setDate: date => {
    return {
      type: actions.SET_DATE,
      payload: date,
    };
  },

  setTime: time => {
    return {
      type: actions.SET_TIME,
      payload: time,
    };
  },
};

export default actions;
