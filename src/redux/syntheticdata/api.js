import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

/**
 * syntheticdata get
 */
export const syntheticdata = params =>
  DataService.get('backend', endPoints.syntheticdata, params).then(response => response.data);

export const rentalHistory = params =>
  DataService.get('backend', endPoints.rentalHistory, params).then(response => response.data);
