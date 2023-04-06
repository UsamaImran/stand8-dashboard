const actions = {
  READ_RECRUITERS_ALIGNMENT_BEGIN: 'READ_RECRUITERS_ALIGNMENT_BEGIN',
  READ_RECRUITERS_ALIGNMENT_SUCCESS: 'READ_RECRUITERS_ALIGNMENT_SUCCESS',
  READ_RECRUITERS_ALIGNMENT_ERR: 'READ_RECRUITERS_ALIGNMENT_ERR',

  READ_RECRUITERS_ASSIGNMENTS_BEGIN: 'READ_RECRUITERS_ASSIGNMENTS_BEGIN',
  READ_RECRUITERS_ASSIGNMENTS_SUCCESS: 'READ_RECRUITERS_ASSIGNMENTS_SUCCESS',
  READ_RECRUITERS_ASSIGNMENTS_ERR: 'READ_RECRUITERS_ASSIGNMENTS_ERR',

  readRecruitersAssignmentsBegin: () => {
    return {
      type: actions.READ_RECRUITERS_ASSIGNMENTS_BEGIN,
    };
  },

  readRecruitersAssignmentsSuccess: data => {
    return {
      type: actions.READ_RECRUITERS_ASSIGNMENTS_SUCCESS,
      data,
    };
  },

  readRecruitersAssignmentsErr: data => {
    return {
      type: actions.READ_RECRUITERS_ASSIGNMENTS_ERR,
      data,
    };
  },

  readRecruitersAlignmentBegin: () => {
    return {
      type: actions.READ_RECRUITERS_ALIGNMENT_BEGIN,
    };
  },

  readRecruitersAlignmentSuccess: data => {
    return {
      type: actions.READ_RECRUITERS_ALIGNMENT_SUCCESS,
      data,
    };
  },

  readRecruitersAlignmentErr: data => {
    return {
      type: actions.READ_RECRUITERS_ALIGNMENT_ERR,
      data,
    };
  },
};

export default actions;
