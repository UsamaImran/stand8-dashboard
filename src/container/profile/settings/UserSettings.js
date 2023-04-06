import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';

import { Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { SettingWrapper } from './overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';

const UserProfile = lazy(() => import('./overview/user/UserProfile'));
const UserAccount = lazy(() => import('./overview/user/UserAccount'));
const UserPassword = lazy(() => import('./overview/user/UserPasswoard'));
const UserAuthorBox = lazy(() => import('./overview/user/UserProfileAuthorBox'));
const UserCoverSection = lazy(() => import('./overview/user/UserCoverSection'));
const UserAdminSettings = lazy(() => import('./overview/user/UserAdminSettings'));

const UserSettings = ({ match }) => {
  const { path } = match;

  const { editUserData } = useSelector(reduxState => {
    return {
      editUserData: reduxState.editUser.editUser,
    };
  });

  return (
    <>
      <PageHeader ghost title="User Profile Settings" />
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
              <UserAuthorBox userData={editUserData} />
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
                <UserCoverSection userData={editUserData} />
              </Suspense>
              <Switch>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton paragraph={{ rows: 20 }} />
                    </Cards>
                  }
                >
                  <Route exact path={`${path}`} component={UserProfile} />
                  <Route exact path={`${path}/profile`} component={UserProfile} />
                  <Route exact path={`${path}/account`} component={UserAccount} />
                  <Route exact path={`${path}/password`} component={UserPassword} />
                  <Route exact path={`${path}/admin-settings`} component={UserAdminSettings} />
                </Suspense>
              </Switch>
            </SettingWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

UserSettings.propTypes = {
  match: propTypes.object,
};

export default UserSettings;
