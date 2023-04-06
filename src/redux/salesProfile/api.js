import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getSaleUsersApi = params =>
  DataService.get('backend', endPoints.salesProfile.saleUsers, params).then(response => response.data);

export const getAccountSummaryApi = params =>
  DataService.get('backend', endPoints.salesProfile.accountSummary, params).then(response => response.data);

export const getMonthlySummaryApi = params =>
  DataService.get('backend', endPoints.salesProfile.monthlySummary, params).then(response => response.data);

export const getWeeklySummaryApi = params =>
  DataService.get('backend', endPoints.salesProfile.weeklySummary, params).then(response => response.data);

export const getWeeklySalesTargetApi = params =>
  DataService.get('backend', endPoints.salesProfile.weeklySalesTarget, params).then(response => response.data);

export const getTextusApi = params =>
  DataService.get('backend', endPoints.salesProfile.textus, params).then(response => response.data);

export const getVoipApi = params =>
  DataService.get('backend', endPoints.salesProfile.voip, params).then(response => response.data);

export const getContractorsEndingApi = params =>
  DataService.get('backend', endPoints.salesProfile.contractorsEnding, params).then(response => response.data);

export const getSpreadHistoryApi = params =>
  DataService.get('backend', endPoints.salesProfile.spreadHistory, params).then(response => response.data);

export const getSalesPerformanceApi = params =>
  DataService.get('backend', endPoints.salesProfile.salesPerformance, params).then(response => response.data);

export const getPlacementStartingSoonApi = params =>
  DataService.get('backend', endPoints.salesProfile.placementStarting, params).then(response => response.data);
