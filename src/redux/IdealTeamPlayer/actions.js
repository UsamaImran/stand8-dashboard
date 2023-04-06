const actions = {
  IDEALTEAMPLAYER_BEGIN: 'IDEALTEAMPLAYER_BEGIN',
  IDEALTEAMPLAYER_ADD_SUCCESS: 'IDEALTEAMPLAYER_ADD_SUCCESS',
  IDEALTEAMPLAYER_ERR: 'IDEALTEAMPLAYER_ERR',

  idealteamplayerBegin: () => {
    return {
      type: actions.IDEALTEAMPLAYER_BEGIN,
    };
  },

  idealteamplayerSuccess: data => {
    return {
      type: actions.IDEALTEAMPLAYER_ADD_SUCCESS,
      data,
    };
  },

  idealteamplayerErr: err => {
    return {
      type: actions.IDEALTEAMPLAYER_ERR,
      err,
    };
  },
};

export default actions;
