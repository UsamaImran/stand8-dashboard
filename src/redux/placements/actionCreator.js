import moment from 'moment';
import actions from './actions';

import {
  getPlacementsData,
  getPlacementsCorporateUsers,
  placementsPostSalespersonDate,
  placementsPostRecruiter,
  placementsUpdateData,
  placementsPostPushed,
  deletePlacementById,
} from './api';

const {
  placementsTableDataBegin,
  placementsTableDataSuccess,
  placementsTableDataErr,
  placementsCorporateUsersBegin,
  placementsCorporateUsersSuccess,
  placementsCorporateUsersErr,
} = actions;

const placementsTableGetData = values => {
  return async dispatch => {
    try {
      const placementsTableData = await getPlacementsData({ ...values });
      dispatch(placementsTableDataBegin());
      dispatch(placementsTableDataSuccess(placementsTableData.data));
    } catch (err) {
      dispatch(placementsTableDataErr(err));
    }
  };
};

const placementsCorporateUsers = () => {
  return async dispatch => {
    try {
      const corporateUsers = await getPlacementsCorporateUsers();
      dispatch(placementsCorporateUsersBegin());
      dispatch(placementsCorporateUsersSuccess(corporateUsers.data));
    } catch (err) {
      dispatch(placementsCorporateUsersErr(err));
    }
  };
};

const placementUpdateData = values => {
  const recruiter = values.recruiter && { recruiter_id: values.recruiter };
  const salesperson = values.salesperson && { salesperson_id: values.salesperson };
  const dateEnd = values.updatedEndDate && { date_end: values.updatedEndDate };

  const recruiterRequest = recruiter && {
    candidate_id: values.candidate_id,
    ...recruiter,
  };

  const salespersonDateRequest = (salesperson || dateEnd) && {
    placement_id: values.placement_id,
    ...salesperson,
    ...dateEnd,
  };

  const placementDate = values.updatedEndDate && {
    end_date: moment.unix(values.updatedEndDate / 1000).format('MM-DD-YYYY'),
  };
  const placementRecruiter = values.recruiter && { recruiter: values.recruiterUserName };
  const placementSalesperson = values.salesperson && { salesperson: values.salespersonUserName };
  const placementNotes = values.notes && { notes: values.notes };

  const placementRequest = {
    id: values.id,
    ...placementRecruiter,
    ...placementSalesperson,
    ...placementNotes,
    ...placementDate,
  };

  return async dispatch => {
    try {
      // eslint-disable-next-line no-unused-vars
      const resPostSalespersonDate =
        salespersonDateRequest && (await placementsPostSalespersonDate(salespersonDateRequest));
      // eslint-disable-next-line no-unused-vars
      const resRecruiter = recruiterRequest && (await placementsPostRecruiter(recruiterRequest));

      const resPlacementsData = await placementsUpdateData(placementRequest);
      dispatch(placementsTableDataBegin());
      dispatch(placementsTableDataSuccess(resPlacementsData.data));

      if (typeof values.cb === 'function') {
        values.cb();
      }
    } catch (err) {
      dispatch(placementsTableDataErr(err));
    }
  };
};

const placementsUpdatePushed = values => {
  const request = {
    placement_ids: values.placementsIds,
    pushed_date: values.pushed_date,
  };
  return async dispatch => {
    try {
      const placementsTableData = await placementsPostPushed(request);
      dispatch(placementsTableDataBegin());
      dispatch(placementsTableDataSuccess(placementsTableData.data));
      if (typeof values.cb === 'function') {
        values.cb();
      }
    } catch (err) {
      dispatch(placementsTableDataErr(err));
    }
  };
};

const placementDeleteById = values => {
  return async dispatch => {
    try {
      const placementsTableData = await deletePlacementById(values.placement_id);
      dispatch(placementsTableDataBegin());
      dispatch(placementsTableDataSuccess(placementsTableData.data));
      if (typeof values.cb === 'function') {
        values.cb();
      }
    } catch (err) {
      dispatch(placementsTableDataErr(err));
    }
  };
};

export {
  placementsTableGetData,
  placementsCorporateUsers,
  placementUpdateData,
  placementsUpdatePushed,
  placementDeleteById,
};
