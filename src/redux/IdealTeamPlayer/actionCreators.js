import actions from './actions';
import { addIdealTeamPlayer } from './api';

const { idealteamplayerBegin, idealteamplayerSuccess, idealteamplayerErr } = actions;

const idealteamplayer = (params, form) => {
  return async dispatch => {
    try {
      dispatch(idealteamplayerBegin());
      await addIdealTeamPlayer(params);
      dispatch(idealteamplayerSuccess({ form }));
    } catch (err) {
      dispatch(idealteamplayerErr(err));
    }
  };
}

export { idealteamplayer };
