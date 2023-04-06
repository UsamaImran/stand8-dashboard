const actions = {
  PORTFOLIO_BEGIN: 'PORTFOLIO_BEGIN',
  PORTFOLIO_SUCCESS: 'PORTFOLIO_SUCCESS',
  PORTFOLIO_ERR: 'PORTFOLIO_ERR',
  PORTFOLIO_ADD_SUCCESS: 'PORTFOLIO_ADD_SUCCESS',
  PORTFOLIO_DELETE_SUCCESS: 'PORTFOLIO_DELETE_SUCCESS',
  PORTFOLIO_EDIT_SUCCESS: 'PORTFOLIO_EDIT_SUCCESS',

  asanaPortfolioBegin: () => {
    return {
      type: actions.PORTFOLIO_BEGIN,
    };
  },

  asanaPortfolioSuccess: data => {
    return {
      type: actions.PORTFOLIO_SUCCESS,
      data,
    };
  },

  asanaPortfolioAddSuccess: data => {
    return {
      type: actions.PORTFOLIO_ADD_SUCCESS,
      data,
    };
  },

  asanaPortfolioDeleteSuccess: data => {
    return {
      type: actions.PORTFOLIO_DELETE_SUCCESS,
      data,
    };
  },

  asanaPortfolioEditSuccess: data => {
    return {
      type: actions.PORTFOLIO_EDIT_SUCCESS,
      data,
    };
  },

  asanaPortfolioErr: err => {
    return {
      type: actions.PORTFOLIO_ERR,
      err,
    };
  },
};

export default actions;
