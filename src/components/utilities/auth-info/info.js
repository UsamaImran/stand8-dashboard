import React from 'react';
import { Avatar } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, UserDropDwon } from './auth-info-style';
import Message from './message';
import Notification from './notification';
import Settings from './settings';
import Support from './support';
import { Dropdown } from '../../dropdown/dropdown';

import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';

const AuthInfo = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(state => {
    return {
      user: state.auth.user,
      isLoggedIn: state.auth.login,
      isError: state.auth.error,
    };
  });

  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut());
  };

  if (!isLoggedIn) {
    history.push('/login');
  }

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img
            width="50"
            height="50"
            src={user?.avatar ? user?.avatar : require('../../../static/img/avatar/empty.png')}
            alt="avatar"
            style={{ borderRadius: '50%' }}
          />
          <figcaption>
            <Heading as="h5">
              {user.firstName} {user.lastName}
            </Heading>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link to="/admin/settings">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="dollar-sign" /> Billing
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="users" /> Activity
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <Message />
      <Notification />
      <Settings />
      <Support />

      <div className="nav-author">
        <Dropdown action={['click']} content={userContent} placement="bottomRight">
          <Link to="#" className="head-example">
            <Avatar src={user?.avatar ? user?.avatar : require('../../../static/img/avatar/empty.png')} />
          </Link>
        </Dropdown>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
