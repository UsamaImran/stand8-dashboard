import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getSalesUsersApi = params =>
  DataService.get('backend', endPoints.salesManagement.getSalesUsers, params).then(response => response.data);
