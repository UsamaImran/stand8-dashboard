import React from 'react';
import propTypes from 'prop-types';
import { Upload } from 'antd';
import { uploadFile } from 'react-s3';
import ImgCrop from 'antd-img-crop';
import FeatherIcon from 'feather-icons-react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ProfileAuthorBox } from '../style';
import Heading from '../../../../../components/heading/heading';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { updateEditUser } from '../../../../../redux/editUser/actionCreator';
import { role } from '../../../../../config/userRole';

import 'antd/es/modal/style';
import 'antd/es/slider/style';

const S3_BUCKET = process.env.REACT_APP_BUCKETNAME;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESSKEYID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRETACCESSKEY;
const DIRNAME = process.env.REACT_APP_DIRNAME;

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  dirName: DIRNAME,
};

const UserAuthorBox = ({ userData }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const handleUpload = async file => {
    uploadFile(file, config)
      .then(data => {
        dispatch(updateEditUser({ avatar: data.location, id: userData.id }));
      })
      .catch()
      .finally(() => {});
  };

  return (
    <ProfileAuthorBox>
      <Cards headless>
        <div className="author-info">
          <figure>
            <div className="avatar">
              <img
                src={userData?.avatar ? userData?.avatar : require('../../../../../static/img/avatar/empty.png')}
                alt="avatar"
              />
            </div>
            <ImgCrop shape="round" onModalOk={handleUpload}>
              <Upload listType="picture-card" maxCount={1}>
                <FeatherIcon icon="camera" size={16} />
              </Upload>
            </ImgCrop>
          </figure>
          <figcaption>
            <div className="user-info">
              <Heading as="h4">
                <span style={{ textTransform: 'capitalize' }}>{userData?.firstName}</span>&nbsp;
                <span style={{ textTransform: 'capitalize' }}>{userData?.lastName}</span>
              </Heading>
              <p>{role[userData?.role]}</p>
            </div>
          </figcaption>
        </div>
        <nav className="settings-menmulist">
          <ul>
            <li>
              <NavLink to={`${path}/profile`}>
                <FeatherIcon icon="user" size={14} />
                Edit Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/account`}>
                <FeatherIcon icon="settings" size={14} />
                Account Settings
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/password`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-key"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Change Password
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/admin-settings`}>
                <FeatherIcon icon="users" size={14} />
                Admin Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </Cards>
    </ProfileAuthorBox>
  );
};

UserAuthorBox.propTypes = {
  userData: propTypes.object,
};

export default UserAuthorBox;
