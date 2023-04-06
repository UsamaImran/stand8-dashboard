import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';
/**
 * @params
 * created_from, created_to, paginate, page_size, breakdown, starttime, endtime
 *
 * @returns
 * general report data
 *
 */
export const getReport = params =>
  DataService.get('backend', endPoints.voipReport, params).then(response => response.data);
