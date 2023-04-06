import { DataService } from '../../config/dataService/dataService';
import { endPoints } from '../../config/api/index';

export const addIdealTeamPlayer = params =>
  DataService.post('backend', endPoints.IdealTeamPlayer, params).then(response => response.data);
/**
 * @params
 * player_name, nominating_reason
 *
 * @returns
 * added ideal-team-player
 *
 */
