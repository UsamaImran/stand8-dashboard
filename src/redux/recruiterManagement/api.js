import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getRecruitersApi = params =>
  DataService.get('backend', endPoints.recruiterManagement.getRecruiters, params).then(response => response.data);
