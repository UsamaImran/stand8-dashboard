import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { userReducer } from './users/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import pageFilterReducer from './pageFilter/reducers';
import voIPReportReducer from './VoIPReport/reducers';
import textUsReducer from './textUs/reducers';
import voipPieChartReducer from './VoIPPieChart/reducers';
import placementsReducer from './placements/reducers';
import asanaReducer from './asana/reducers';
import asanaPortfolioReducer from './asanaPortfolio/reducers';
import profileReducer from './profile/reducers';
import syntheticdataReducer from './syntheticdata/reducers';
import chartContentReducer from './chartContent/reducers';
import salesProfileReducer from './salesProfile/reducers';
import salesManagementReducer from './salesManagement/reducers';
import salesTextUsReducer from './salesTextUs/reducers';
import recruiterProfileReducer from './recruiterProfile/reducers';
import recruitersManagementReducer from './recruiterManagement/reducers';
import recruitersAlignmentReducer from './recruiterAlignment/reducers';
import companyOverviewReducer from './companyOverview/reducers';
import Calender from './calendar/reducers';
import { userLogsReducer } from './userLogs/reducers';
import { EditUserReducer } from './editUser/reducers';
import IdealTeamPlayerReducer from './IdealTeamPlayer/reducers';

const rootReducers = combineReducers({
  headerSearchData: headerSearchReducer,
  users: userReducer,
  userLogs: userLogsReducer,
  auth: authReducer,
  profile: profileReducer,
  ChangeLayoutMode,
  pageFilterReducer,
  voIPReportReducer,
  textUsReducer,
  voipPieChartReducer,
  placementsReducer,
  syntheticdataReducer,
  asanaReducer,
  Calender,
  asanaPortfolio: asanaPortfolioReducer,
  chartContent: chartContentReducer,
  salesProfile: salesProfileReducer,
  salesManagement: salesManagementReducer,
  salesTextUs: salesTextUsReducer,
  recruiterProfile: recruiterProfileReducer,
  recruiterManagement: recruitersManagementReducer,
  recruitersAlignment: recruitersAlignmentReducer,
  companyOverview: companyOverviewReducer,
  IdealTeamPlayerReducer,
  editUser: EditUserReducer,
});

export default rootReducers;
