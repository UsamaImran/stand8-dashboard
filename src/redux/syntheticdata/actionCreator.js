import actions from './actions';
import { syntheticdata, rentalHistory } from './api';

const {
  syntheticdataBegin,
  syntheticdataSuccess,
  syntheticdataErr,
  rentalHistoryBegin,
  rentalHistorySuccess,
  rentalHistoryErr,
} = actions;

const getSyntheticdata = values => {
  return async dispatch => {
    try {
      dispatch(syntheticdataBegin());
      const res = await syntheticdata(values);
      dispatch(syntheticdataSuccess(res.data));
    } catch (err) {
      dispatch(syntheticdataErr(err));
    }
  };
};

const getRentalHistory = values => {
  return async dispatch => {
    try {
      dispatch(rentalHistoryBegin());
      const res = await rentalHistory(values);
      dispatch(rentalHistorySuccess(res.data));
    } catch (err) {
      dispatch(rentalHistoryErr(err));
    }
  };
};

export { getSyntheticdata, getRentalHistory };
