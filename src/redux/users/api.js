import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getUsersApi = () => DataService.get('backend', endPoints.users).then(response => response.data);

export const createUserApi = params =>
  DataService.post('backend', `${endPoints.users}`, params).then(response => response.data);

export const updateUserApi = params =>
  DataService.put('backend', `${endPoints.users}/${params.id}`, params).then(response => response.data);

export const deleteUserApi = userId =>
  DataService.delete('backend', `${endPoints.users}/${userId}`).then(response => response.data);
