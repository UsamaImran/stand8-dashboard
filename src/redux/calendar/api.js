import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getSalesCalenderDataApi = params =>
  DataService.get('backend', endPoints.salesProfile.salesUserCalender, params).then(response => response.data);

export const getRecruiterCalenderDataApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.recruiterUserCalender, params).then(response => response.data);
