import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const putEditUserApi = params =>
  DataService.put('backend', `${endPoints.editUser}/${params.id}`, params).then(response => response.data);
