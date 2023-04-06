import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

/**
 * placements Update
 */
export const asanaSettingsLogin = () =>
  DataService.get('asana', endPoints.asanaSettingsLogin)
    .then(response => response.data)
    .catch(error => error);
