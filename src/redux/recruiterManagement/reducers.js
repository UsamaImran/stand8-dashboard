// Todo: Error Handling Need
import actions from './actions';

const { READ_RECRUITERS_BEGIN, READ_RECRUITERS_SUCCESS } = actions;

const initState = {
  recruiters: null,
  recruitersLoading: false,
};

const recruitersManagementReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case READ_RECRUITERS_BEGIN:
      return {
        ...state,
        recruitersLoading: true,
      };
    case READ_RECRUITERS_SUCCESS:
      return {
        ...state,
        recruiters: data,
        recruitersLoading: false,
      };
    default:
      return state;
  }
};
export default recruitersManagementReducer;
