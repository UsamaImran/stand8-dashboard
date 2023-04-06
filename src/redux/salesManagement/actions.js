const actions = {
  READ_SALES_USERS_BEGIN: 'READ_SALES_MANAGEMENT_USERS_BEGIN',
  READ_SALES_USERS_SUCCESS: 'READ_SALES_MANAGEMENT_USERS_SUCCESS',

  readSalesUserBegin: () => {
    return {
      type: actions.READ_SALES_USERS_BEGIN,
    };
  },

  readSalesUserSuccess: data => {
    return {
      type: actions.READ_SALES_USERS_SUCCESS,
      data,
    };
  },
};

export default actions;
