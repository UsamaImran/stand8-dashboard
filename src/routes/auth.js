import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
const ResetPass = lazy(() => import('../container/profile/authentication/overview/ResetPassword'));
const VerifyEmail = lazy(() => import('../container/profile/authentication/overview/VerifyEmail'));
const NotFound = lazy(() => import('../container/error/NotFound'));

const FrontendRoutes = () => {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/forgot-password" component={ForgotPass} />
        <Route exact path="/reset-password/update/:token" component={ResetPass} />
        <Route exact path="/verify-email/:token" component={VerifyEmail} />
        <Route component={NotFound} />
      </Suspense>
    </Switch>
  );
};

export default AuthLayout(FrontendRoutes);
