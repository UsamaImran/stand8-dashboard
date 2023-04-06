import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getAccountSummaryApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.accountSummary, params).then(response => response.data);

export const getMonthlySummaryApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.monthlySummary, params).then(response => response.data);

export const getWeeklySummaryApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.weeklySummary, params).then(response => response.data);

export const getWeeklySalesTargetApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.weeklySalesTarget, params).then(response => response.data);

export const getTextusApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.textus, params).then(response => response.data);

export const getVoipApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.voip, params).then(response => response.data);

export const getContractorsEndingApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.contractorsEnding, params).then(response => response.data);

export const getSpreadHistoryApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.spreadHistory, params).then(response => response.data);

export const getCompanyLeaderboardApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.companyLeaderboard, params).then(response => response.data);

export const getRecruiterPerformanceApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.recruiterPerformance, params).then(response => response.data);

export const getRecruiterUsersApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.recruiterUsers, params).then(response => response.data);

export const getPlacementStartingSoonApi = params =>
  DataService.get('backend', endPoints.recruiterProfile.placementStarting, params).then(response => response.data);
