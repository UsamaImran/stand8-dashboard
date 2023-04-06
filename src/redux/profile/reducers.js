import actions from './actions';

const {
  READ_PROFILE_BEGIN,
  READ_PROFILE_ERR,
  READ_PROFILE_SUCCESS,
  UPDATE_PROFILE_BEGIN,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
  UPDATE_PROFILE_RESET,
} = actions;

const initState = {
  profile: null,
  responseUpdate: null,
  profileLoading: false,
  updateProfileLoading: false,
  profileErr: null,
};

const ProfileReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case READ_PROFILE_BEGIN:
      return {
        ...state,
        profileLoading: true,
      };

    case READ_PROFILE_SUCCESS:
      return {
        ...state,
        profile: data,
        profileLoading: false,
      };

    case READ_PROFILE_ERR:
      return {
        ...state,
        profileErr: data,
        profileLoading: false,
      };

    case UPDATE_PROFILE_BEGIN:
      return {
        ...state,
        updateProfileLoading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        responseUpdate: data.msg,
        profile: data.user,
        updateProfileLoading: false,
      };

    case UPDATE_PROFILE_ERR:
      return {
        ...state,
        responseUpdate: data,
        updateProfileLoading: false,
      };

    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        responseUpdate: null,
      };

    default:
      return state;
  }
};
export default ProfileReducer;
