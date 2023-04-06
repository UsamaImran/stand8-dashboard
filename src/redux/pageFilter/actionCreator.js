import actions from './actions';

const { setDate, setTime } = actions;

const onSetDate = selected => {
  return async dispatch => {
    dispatch(setDate(selected));
  };
};

const onSetTime = selected => {
  return async dispatch => {
    dispatch(setTime(selected));
  };
};

export { onSetDate, onSetTime };
