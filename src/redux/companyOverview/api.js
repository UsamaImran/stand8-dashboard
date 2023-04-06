import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const getCompanyLeaderboardApi = params =>
  DataService.get('backend', endPoints.companyOverview.companyLeaderboard, params).then(response => response.data);

export const getCompanyCalendarHistory = params =>
  DataService.get('backend', endPoints.companyOverview.companyCalendarHistory, params).then(response => response.data);

export const getCompanyRevenueApi = params =>
  DataService.get('backend', endPoints.companyOverview.companyRevenue, params).then(response => response.data);

export const getHiringRevenueApi = params =>
  DataService.get('backend', endPoints.companyOverview.hiringRevenue, params).then(response => response.data);

export const getCompanyOverviewApi = params =>
  DataService.get('backend', endPoints.companyOverview.overview, params).then(response => response.data);

export const getTopPerformersApi = params =>
  DataService.get('backend', endPoints.companyOverview.topPerformers, params).then(response => response.data);

export const getSpreadHistoryApi = params =>
  DataService.get('backend', endPoints.companyOverview.spreadHistory, params).then(response => response.data);

export const getPerformersDetailsApi = params =>
  DataService.get('backend', endPoints.companyOverview.performersDetails, params).then(response => response.data);

export const getPlacementDetailsApi = params =>
  DataService.get('backend', endPoints.companyOverview.placementDetails, params).then(response => response.data);
