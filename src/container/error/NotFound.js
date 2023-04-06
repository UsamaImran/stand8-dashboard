import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { withRouter, matchPath } from 'react-router';
import { useSelector } from 'react-redux';

const NotFound = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector(state => {
    return {
      isLoggedIn: state.auth.login,
    };
  });

  const verifyEmailMatch = matchPath(location.pathname, {
    path: '/verify-email/:token',
    exact: true,
    strict: false,
  });

  const resetPassMatch = matchPath(location.pathname, {
    path: '/reset-password/update/:token',
    exact: true,
    strict: false,
  });

  if (verifyEmailMatch != null || resetPassMatch != null) {
    return <span />;
  }
  if (isLoggedIn) {
    return <Redirect to="/admin" />;
  }
  return <Redirect to="/login" />;
};

export default withRouter(NotFound);
