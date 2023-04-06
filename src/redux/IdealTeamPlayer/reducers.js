import { message } from 'antd';
import actions from './actions';

const initState = {
  idealteamplayers: [],
  isLoading: false,
};

const { IDEALTEAMPLAYER_BEGIN, IDEALTEAMPLAYER_ADD_SUCCESS, IDEALTEAMPLAYER_ERR } = actions;

const IdealTeamPlayerReducer = (state = initState, action) => {
  const { type, data } = action;

  switch (type) {
    case IDEALTEAMPLAYER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case IDEALTEAMPLAYER_ADD_SUCCESS:
      message.success('Form submitted successfully');
      data.form.setFieldsValue({
        player_name: '',
        nominating_reason: '',
      });
      return {
        ...state,
        isLoading: false,
      };
    case IDEALTEAMPLAYER_ERR:
      message.error('Error occured');

      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
export default IdealTeamPlayerReducer;
