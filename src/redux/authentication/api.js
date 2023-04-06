// todo: error handling
import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const signupApi = params =>
  DataService.post('backend', endPoints.auth.signup, params).then(response => response.data);

export const signinApi = params =>
  DataService.post('backend', endPoints.auth.login, params).then(response => response.data);

export const signoutApi = () => DataService.get('backend', endPoints.auth.signout).then(response => response.data);

export const changePassApi = params =>
  DataService.post('backend', endPoints.changePassApi, params).then(response => response.data);
