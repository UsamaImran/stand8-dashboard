import actions from './actions';

const {
  READ_EDITUSER_BEGIN,
  READ_EDITUSER_SUCCESS,
  READ_EDITUSER_ERR,
  UPDATE_EDITUSER_BEGIN,
  UPDATE_EDITUSER_SUCCESS,
  UPDATE_EDITUSER_ERR,
} = actions;

const initState = {
  editUser: null,
  error: null,
  loading: false,
};

const EditUserReducer = (state = initState, action) => {
  const { type, data, err } = action;

  switch (type) {
    case UPDATE_EDITUSER_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_EDITUSER_SUCCESS:
      return {
        ...state,
        editUser: data,
        loading: false,
      };

    case UPDATE_EDITUSER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case READ_EDITUSER_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case READ_EDITUSER_SUCCESS:
      return {
        ...state,
        editUser: data,
        loading: false,
      };

    case READ_EDITUSER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { EditUserReducer };
