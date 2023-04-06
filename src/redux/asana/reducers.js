import actions from './actions';

const initialState = {
  asanaSettingsData: null,
  asdLoading: false,
  error: null,
};

const { ASANASETTINGSLOGIN_BEGIN, ASANASETTINGSLOGIN_SUCCESS, ASANASETTINGSLOGIN_ERR } = actions;

const asanaReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ASANASETTINGSLOGIN_BEGIN:
      return {
        ...state,
        asdLoading: true,
      };

    case ASANASETTINGSLOGIN_SUCCESS:
      return {
        ...state,
        asanaSettingsData: data,
        asdLoading: false,
      };
    case ASANASETTINGSLOGIN_ERR:
      return {
        ...state,
        error: err,
        asdLoading: false,
      };

    default:
      return state;
  }
};

export default asanaReducer;
