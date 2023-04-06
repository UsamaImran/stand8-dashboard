import actions from './actions';

const initialState = {
  placementsTableData: null,
  placementsCorporateUsersData: [],
  ptdLoading: false,
  pcuLoading: false,
  error: null,
};

const {
  PLACEMENTSTABLEDATA_BEGIN,
  PLACEMENTSTABLEDATA_SUCCESS,
  PLACEMENTSTABLEDATA_ERR,
  PLACEMENTSCORPORATEUSERS_BEGIN,
  PLACEMENTSCORPORATEUSERS_SUCCESS,
  PLACEMENTSCORPORATEUSERS_ERR,
} = actions;

const placementsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    // placements Data
    case PLACEMENTSTABLEDATA_BEGIN:
      return {
        ...state,
        ptdLoading: true,
      };

    case PLACEMENTSTABLEDATA_SUCCESS:
      return {
        ...state,
        placementsTableData: data,
        ptdLoading: false,
      };
    case PLACEMENTSTABLEDATA_ERR:
      return {
        ...state,
        error: err,
        ptdLoading: false,
      };

    case PLACEMENTSCORPORATEUSERS_BEGIN:
      return {
        ...state,
        pcuLoading: true,
      };

    case PLACEMENTSCORPORATEUSERS_SUCCESS:
      return {
        ...state,
        placementsCorporateUsersData: data,
        pcuLoading: false,
      };
    case PLACEMENTSCORPORATEUSERS_ERR:
      return {
        ...state,
        error: err,
        pcuLoading: false,
      };
    default:
      return state;
  }
};

export default placementsReducer;
