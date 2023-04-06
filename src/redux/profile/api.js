import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getProfileApi = params =>
  DataService.get('backend', endPoints.profile, params).then(response => response.data);

export const putProfileApi = params =>
  DataService.put('backend', endPoints.profile, params).then(response => response.data);
