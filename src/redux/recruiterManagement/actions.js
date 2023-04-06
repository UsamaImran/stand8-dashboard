const actions = {
  READ_RECRUITERS_BEGIN: 'READ_RECRUITER_MANAGEMENT_USERS_BEGIN',
  READ_RECRUITERS_SUCCESS: 'READ_RECRUITER_MANAGEMENT_USERS_SUCCESS',

  readRecruiterBegin: () => {
    return {
      type: actions.READ_RECRUITERS_BEGIN,
    };
  },

  readRecruiterSuccess: data => {
    return {
      type: actions.READ_RECRUITERS_SUCCESS,
      data,
    };
  },
};

export default actions;
