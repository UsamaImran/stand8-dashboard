import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

/**
 * get placements Data
 */
export const getPlacementsData = params =>
  DataService.get('backend', endPoints.placementsData, params).then(response => response.data);

/**
 * post placements Data
 */
export const placementsUpdateData = params =>
  DataService.post('backend', endPoints.placementsData, params).then(response => response.data);

/**
 * placements Corporate Users
 */
export const getPlacementsCorporateUsers = params =>
  DataService.get('backend', endPoints.placementsCorporateUsers, params).then(response => response.data);

/**
 * placements Update
 */
export const placementsPostSalespersonDate = params =>
  DataService.post('backend', endPoints.placementsPostSalespersonDate, params).then(response => response.data);

export const placementsPostRecruiter = params =>
  DataService.post('backend', endPoints.placementsPostRecruiter, params).then(response => response.data);

export const placementsPostPushed = params =>
  DataService.post('backend', endPoints.placementsUpdatePushed, params).then(response => response.data);

/**
 * placements Delete by ID
 */

export const deletePlacementById = params =>
  DataService.delete('backend', `${endPoints.placementsData}/${params}`).then(response => response.data);
