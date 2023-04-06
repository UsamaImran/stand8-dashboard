// Todo: Error Handling Need
import actions from './actions';

const { READ_SALES_USERS_BEGIN, READ_SALES_USERS_SUCCESS } = actions;

const initState = {
  salesUsers: null,
  salesUsersLoading: false,
};

const salesManagementReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case READ_SALES_USERS_BEGIN:
      return {
        ...state,
        salesUsersLoading: true,
      };
    case READ_SALES_USERS_SUCCESS:
      return {
        ...state,
        salesUsers: data,
        salesUsersLoading: false,
      };
    default:
      return state;
  }
};

export default salesManagementReducer;
