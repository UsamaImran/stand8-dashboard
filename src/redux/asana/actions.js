const actions = {
  ASANASETTINGSLOGIN_BEGIN: 'ASANASETTINGSLOGIN_BEGIN',
  ASANASETTINGSLOGIN_SUCCESS: 'ASANASETTINGSLOGIN_SUCCESS',
  ASANASETTINGSLOGIN_ERR: 'ASANASETTINGSLOGIN_ERR',

  asanaSettingsLoginBegin: () => {
    return {
      type: actions.ASANASETTINGSLOGIN_BEGIN,
    };
  },

  asanaSettingsLoginSuccess: data => {
    return {
      type: actions.ASANASETTINGSLOGIN_SUCCESS,
      data,
    };
  },

  asanaSettingsLoginErr: err => {
    return {
      type: actions.ASANASETTINGSLOGIN_ERR,
      err,
    };
  },
};

export default actions;
