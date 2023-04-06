import { message } from 'antd';
import actions from './actions';

const {
  PORTFOLIO_BEGIN,
  PORTFOLIO_SUCCESS,
  PORTFOLIO_ADD_SUCCESS,
  PORTFOLIO_DELETE_SUCCESS,
  PORTFOLIO_EDIT_SUCCESS,
  PORTFOLIO_ERR,
} = actions;

const initState = {
  portfolios: [],
  isLoading: false,
};

const ProfileReducer = (state = initState, action) => {
  const { type, data } = action;
  const portfolios = [...state.portfolios];
  switch (type) {
    case PORTFOLIO_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case PORTFOLIO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        portfolios: [...data.data],
      };
    case PORTFOLIO_ADD_SUCCESS:
      message.success('Portfolio added successfully');
      return {
        ...state,
        isLoading: false,
        portfolios: [...state.portfolios, data.data],
      };
    case PORTFOLIO_DELETE_SUCCESS:
      message.success('Portfolio deleted successfully');
      return {
        ...state,
        isLoading: false,
        portfolios: [...state.portfolios.filter(portfolio => portfolio.id !== data.id)],
      };
    case PORTFOLIO_EDIT_SUCCESS:
      message.success('Portfolio updated successfully');
      portfolios[portfolios.findIndex(item => item.id === data.portfolio.id)] = { ...data.portfolio };
      return {
        ...state,
        isLoading: false,
        portfolios: [...portfolios],
      };
    case PORTFOLIO_ERR:
      message.error('Something went wrong');
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default ProfileReducer;
