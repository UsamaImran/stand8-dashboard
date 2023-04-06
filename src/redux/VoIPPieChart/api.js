import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';
/**
 * @params
 *  period: year, month, week, today, yesterday
 * @returns
 *
 */
export const getVoipPieChartOverview = params =>
  DataService.get('backend', endPoints.voipPieChartOverview, params).then(response => response.data);

/**
 * @params
 *  period: year, month, week, today, yesterday
 * @returns
 *
 */
export const getVoipBarChartOverview = params =>
  DataService.get('backend', endPoints.voipBarChartOverview, params).then(response => response.data);

/**
 * @params
 *  period: year, month, week, today, yesterday
 * @returns
 *
 */
export const getVoipStatsPieChartOverview = params =>
  DataService.get('backend', `${endPoints.voipStatsPieChartOverview}/${params.period}`, params).then(
    response => response.data,
  );
