import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import useRoutes from '../../hooks/useRoutes';

const UserSettings = lazy(() => import('../../container/profile/settings/UserSettings'));

const DashboardRoutes = () => {
  const { path } = useRouteMatch();
  const [appRoutes] = useRoutes();

  return (
    <Switch>
      {appRoutes.map(route => (
        <Route path={`${path}${route.path}`} component={route.component} exact={route.exact} key={route.key} />
      ))}
      <Route path={`${path}${'/user/settings'}`} component={UserSettings} exact={false} />
    </Switch>
  );
};

export default DashboardRoutes;
