const actions = {
  PLACEMENTSTABLEDATA_BEGIN: 'PLACEMENTSTABLEDATA_BEGIN',
  PLACEMENTSTABLEDATA_SUCCESS: 'PLACEMENTSTABLEDATA_SUCCESS',
  PLACEMENTSTABLEDATA_ERR: 'PLACEMENTSTABLEDATA_ERR',

  PLACEMENTSCORPORATEUSERS_BEGIN: 'PLACEMENTSCORPORATEUSERS_BEGIN',
  PLACEMENTSCORPORATEUSERS_SUCCESS: 'PLACEMENTSCORPORATEUSERS_SUCCESS',
  PLACEMENTSCORPORATEUSERS_ERR: 'PLACEMENTSCORPORATEUSERS_ERR',

  placementsTableDataBegin: () => {
    return {
      type: actions.PLACEMENTSTABLEDATA_BEGIN,
    };
  },

  placementsTableDataSuccess: data => {
    return {
      type: actions.PLACEMENTSTABLEDATA_SUCCESS,
      data,
    };
  },

  placementsTableDataErr: err => {
    return {
      type: actions.PLACEMENTSTABLEDATA_ERR,
      err,
    };
  },

  placementsCorporateUsersBegin: () => {
    return {
      type: actions.PLACEMENTSCORPORATEUSERS_BEGIN,
    };
  },

  placementsCorporateUsersSuccess: data => {
    return {
      type: actions.PLACEMENTSCORPORATEUSERS_SUCCESS,
      data,
    };
  },

  placementsCorporateUsersErr: err => {
    return {
      type: actions.PLACEMENTSCORPORATEUSERS_ERR,
      err,
    };
  },
};

export default actions;
