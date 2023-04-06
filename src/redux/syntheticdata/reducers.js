import actions from './actions';

const initialState = {
  syntheticdata: null,
  syntheticdataLoading: false,
  syntheticdataError: null,
  rentalHistory: null,
  rentalHistoryLoading: false,
  rentalHistoryError: null,
};

const {
  SYNTHETICDATA_BEGIN,
  SYNTHETICDATA_SUCCESS,
  SYNTHETICDATA_ERR,
  RENTALHISTORY_BEGIN,
  RENTALHISTORY_SUCCESS,
  RENTALHISTORY_ERR,
} = actions;

const syntheticdataReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SYNTHETICDATA_BEGIN:
      return {
        ...state,
        syntheticdataLoading: true,
      };

    case SYNTHETICDATA_SUCCESS:
      return {
        ...state,
        syntheticdata: data,
        syntheticdataLoading: false,
      };

    case SYNTHETICDATA_ERR:
      return {
        ...state,
        syntheticdataError: err,
        syntheticdataLoading: false,
      };

    case RENTALHISTORY_BEGIN:
      return {
        ...state,
        rentalHistoryLoading: true,
      };

    case RENTALHISTORY_SUCCESS:
      return {
        ...state,
        rentalHistory: data,
        rentalHistoryLoading: false,
      };

    case RENTALHISTORY_ERR:
      return {
        ...state,
        rentalHistoryError: err,
        rentalHistoryLoading: false,
      };

    default:
      return state;
  }
};

export default syntheticdataReducer;
