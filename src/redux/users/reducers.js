import actions from './actions';
import initialStateGroup from '../../demoData/usersGroupData.json';

const {
  CREATE_USER_SUCCESS,
  CREATE_USER_ERR,

  READ_USERS_SUCCESS,
  READ_USERS_ERR,

  UPDATE_USER_SUCCESS,

  DELETE_USER_SUCCESS,
} = actions;

const initState = {
  users: [],
  responseRead: null,
  responseCreate: null,
};

const userReducer = (state = initState, action) => {
  const { type, data, err } = action;

  switch (type) {
    // Create
    case CREATE_USER_SUCCESS:
      return {
        ...state,
      };
    case CREATE_USER_ERR:
      return {
        ...state,
        responseCreate: err,
      };

    // Read
    case READ_USERS_SUCCESS:
      return {
        ...state,
        users: data,
      };
    case READ_USERS_ERR:
      return {
        ...state,
        responseRead: data,
      };

    // Update
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
      };

    // Delete
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users?.filter(u => u.id !== data),
      };
    default:
      return state;
  }
};

const userGroupReducer = (state = initialStateGroup) => {
  return state;
};

export { userReducer, userGroupReducer };
