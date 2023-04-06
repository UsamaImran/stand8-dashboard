import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './dashboard';
import withAdminLayout from '../../layout/withAdminLayout';
import { isRecruiter, isSalePerson } from '../../utility/helpers';
import { ModalOnStartSale } from '../../container/dashboard/SalesProfile';
import { ModalOnStartRecruiter } from '../../container/dashboard/RecruiterProfile';

const Admin = () => {
  const { path } = useRouteMatch();
  const { authUser } = useSelector(state => {
    return {
      authUser: state.auth.user,
    };
  });

  const userRole = authUser.role;
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        {isSalePerson(userRole) ? <ModalOnStartSale /> : null}
        {isRecruiter(userRole) ? <ModalOnStartRecruiter /> : null}
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
