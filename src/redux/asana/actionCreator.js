import actions from './actions';
import { asanaSettingsLogin } from './api';

const { asanaSettingsLoginBegin, asanaSettingsLoginSuccess, asanaSettingsLoginErr } = actions;

const asanaSettingsUpdate = values => {
  return async dispatch => {
    try {
      dispatch(asanaSettingsLoginBegin());
      const asanaSettingsData = await asanaSettingsLogin();
      dispatch(asanaSettingsLoginSuccess(asanaSettingsData.data));
      if (typeof values.cb === 'function') {
        values.cb();
      }
    } catch (err) {
      dispatch(asanaSettingsLoginErr(err));
    }
  };
};

export { asanaSettingsUpdate };
