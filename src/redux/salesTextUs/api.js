import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';
/**
 * @params
 *  period: year, month, week, yesterday
 * @returns
 *
 */
export const getAnalyticsEngagement = params =>
  DataService.get('backend', endPoints.salesTextus.textUsUserEngagement, params)
    .then(response => response.data)
    .catch(error => error);

export const textUsOneUserApi = params =>
  DataService.get('backend', endPoints.salesTextus.textUsOneUserEngagement, params)
    .then(response => response.data)
    .catch(error => error);

/**
 * @params
 *  period: year, month, week, yesterday
 * @returns
 *
 */
export const getAnalyticsDeliverability = params =>
  DataService.get('backend', endPoints.salesTextus.textUsMessageDeliverability, params).then(response => response.data);

/**
 * @params
 *  period: yesterday, today
 * @returns
 *
 */
export const getAnalyticsOverview = params =>
  DataService.get('backend', endPoints.salesTextus.textUsAnalyticsOverview, params).then(response => response.data);

/**
 * @params
 *  period: year, month, week
 * @returns
 *
 */
export const getAnalyticsCompanyWide = params =>
  DataService.get('backend', endPoints.salesTextus.textUsCompanyWide, params).then(response => response.data);
