import actions from './actions';
import { getAsanaPortfolio, addAsanaPortfolio, deleteAsanaPortfolio, editAsanaPortfolio } from './api';

const {
  asanaPortfolioBegin,
  asanaPortfolioSuccess,
  asanaPortfolioErr,
  asanaPortfolioDeleteSuccess,
  asanaPortfolioAddSuccess,
  asanaPortfolioEditSuccess,
} = actions;

const asanaPortfolioGet = params => {
  return async dispatch => {
    try {
      dispatch(asanaPortfolioBegin());
      const asanaPortfolio = await getAsanaPortfolio(params);
      dispatch(asanaPortfolioSuccess({ ...asanaPortfolio }));
    } catch (err) {
      dispatch(asanaPortfolioErr(err));
    }
  };
};

const asanaPortfolioAdd = params => {
  return async dispatch => {
    try {
      dispatch(asanaPortfolioBegin());
      const asanaPortfolio = await addAsanaPortfolio(params);
      dispatch(asanaPortfolioAddSuccess({ ...asanaPortfolio }));
      params.cb();
    } catch (err) {
      dispatch(asanaPortfolioErr(err));
    }
  };
};

const asanaPortfolioDelete = params => {
  return async dispatch => {
    try {
      dispatch(asanaPortfolioBegin());
      const asanaPortfolio = await deleteAsanaPortfolio(params);
      dispatch(asanaPortfolioDeleteSuccess({ ...asanaPortfolio, id: params.id }));
    } catch (err) {
      dispatch(asanaPortfolioErr(err));
    }
  };
};

const asanaPortfolioEdit = params => {
  return async dispatch => {
    try {
      dispatch(asanaPortfolioBegin());
      const asanaPortfolio = await editAsanaPortfolio(params);
      dispatch(asanaPortfolioEditSuccess({ ...asanaPortfolio, portfolio: { ...params.editData } }));
      params.cb();
    } catch (err) {
      dispatch(asanaPortfolioErr(err));
    }
  };
};

export { asanaPortfolioGet, asanaPortfolioAdd, asanaPortfolioDelete, asanaPortfolioEdit };
