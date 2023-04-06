import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';

import { Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { SettingWrapper } from './overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';

const Profile = lazy(() => import('./overview/Profile'));
const Account = lazy(() => import('./overview/Account'));
const Password = lazy(() => import('./overview/Passwoard'));
const AuthorBox = lazy(() => import('./overview/ProfileAuthorBox'));
const CoverSection = lazy(() => import('./overview/CoverSection'));
const AdminSettings = lazy(() => import('./overview/AdminSettings'));

const Settings = ({ match }) => {
  const { path } = match;

  const { profileData } = useSelector(reduxState => {
    return {
      profileData: reduxState.profile.profile,
    };
  });

  return (
    <>
      <PageHeader ghost title="Profile Settings" />
      <Main>
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton avatar />
                </Cards>
              }
            >
              <AuthorBox userData={profileData} />
            </Suspense>
          </Col>
          <Col xxl={18} lg={16} md={14} xs={24}>
            <SettingWrapper>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton avatar />
                  </Cards>
                }
              >
                <CoverSection userData={profileData} />
              </Suspense>
              <Switch>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton paragraph={{ rows: 20 }} />
                    </Cards>
                  }
                >
                  <Route exact path={`${path}`} component={Profile} />
                  <Route exact path={`${path}/profile`} component={Profile} />
                  <Route exact path={`${path}/account`} component={Account} />
                  <Route exact path={`${path}/password`} component={Password} />
                  {profileData?.role === 'superAdmin' ||
                    (profileData?.role === 'admin' && (
                      <Route exact path={`${path}/admin-settings`} component={AdminSettings} />
                    ))}
                </Suspense>
              </Switch>
            </SettingWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

Settings.propTypes = {
  match: propTypes.object,
};

export default Settings;
