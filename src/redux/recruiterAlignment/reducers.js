import actions from './actions';

const {
  READ_RECRUITERS_ALIGNMENT_BEGIN,
  READ_RECRUITERS_ALIGNMENT_SUCCESS,
  READ_RECRUITERS_ALIGNMENT_ERR,
  READ_RECRUITERS_ASSIGNMENTS_BEGIN,
  READ_RECRUITERS_ASSIGNMENTS_SUCCESS,
  READ_RECRUITERS_ASSIGNMENTS_ERR,
} = actions;

const initState = {
  recruitersAlignment: null,
  recruitersAlignmentLoading: false,
  recruitersAlignmentErr: null,
  recruitersAssignments: null,
  recruitersAssignmentsLoading: false,
  recruitersAssignmentsErr: null,
};

const recruitersAlignmentReducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case READ_RECRUITERS_ASSIGNMENTS_BEGIN:
      return {
        ...state,
        recruitersAssignmentsLoading: true,
      };

    case READ_RECRUITERS_ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        recruitersAssignments: data,
        recruitersAssignmentsLoading: false,
      };

    case READ_RECRUITERS_ASSIGNMENTS_ERR:
      return {
        ...state,
        recruitersAssignmentsErr: data,
        recruitersAssignmentsLoading: false,
      };

    case READ_RECRUITERS_ALIGNMENT_BEGIN:
      return {
        ...state,
        recruitersAlignmentLoading: true,
      };

    case READ_RECRUITERS_ALIGNMENT_SUCCESS:
      return {
        ...state,
        recruitersAlignment: data,
        recruitersAlignmentLoading: false,
      };

    case READ_RECRUITERS_ALIGNMENT_ERR:
      return {
        ...state,
        recruitersAlignmentErr: data,
        recruitersAlignmentLoading: false,
      };

    default:
      return state;
  }
};
export default recruitersAlignmentReducer;
