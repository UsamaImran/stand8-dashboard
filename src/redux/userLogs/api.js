import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getUserLogsApi = () => DataService.get('backend', endPoints.userLogs).then(response => response.data);
