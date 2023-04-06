import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';
/**
 * @params
 *
 *
 * @returns
 * prtfolio list
 *
 */
export const getAsanaPortfolio = params =>
  DataService.get('backend', endPoints.asanaPortfolio, params).then(response => response.data);

/**
 * @params
 * portfolio_id, name, description, active
 *
 * @returns
 * added portfolio
 *
 */
export const addAsanaPortfolio = params =>
  DataService.post('backend', endPoints.asanaPortfolio, params).then(response => response.data);
/**
 * @params
 *
 *
 * @returns
 *
 *
 */
export const deleteAsanaPortfolio = params =>
  DataService.delete('backend', `${endPoints.asanaPortfolio}/${params.id}`).then(response => response.data);
/**
 * @params
 * portfolio_id, name, description, active
 *
 * @returns
 *
 *
 */
export const editAsanaPortfolio = params =>
  DataService.put('backend', `${endPoints.asanaPortfolio}/${params.editId}`, params).then(response => response.data);
