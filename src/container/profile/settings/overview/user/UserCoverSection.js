import React from 'react';
import propTypes from 'prop-types';
import ImgCrop from 'antd-img-crop';
import { useDispatch } from 'react-redux';
import { uploadFile } from 'react-s3';
import { Upload } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { CoverSectionBox } from '../style';
import { updateEditUser } from '../../../../../redux/editUser/actionCreator';

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

const UserCoverSection = ({ userData }) => {
  const dispatch = useDispatch();

  const handleUpload = async file => {
    uploadFile(file, config)
      .then(data => {
        dispatch(updateEditUser({ coverImg: data.location, id: userData.id }));
      })
      .catch()
      .finally(() => {});
  };

  return (
    <CoverSectionBox>
      <div className="cover-image">
        <img
          style={{ width: '100%', borderRadius: '5px' }}
          src={userData?.coverImg ? userData?.coverImg : require('../../../../../static/img/profile/cover-img2.png')}
          alt="banner"
        />

        <ImgCrop shape="rect" aspect={5} onModalOk={handleUpload}>
          <Upload listType="picture-card" maxCount={1} className="cover-image-button">
            <Link to="#">
              <FeatherIcon icon="camera" size={16} /> Change Cover
            </Link>
          </Upload>
        </ImgCrop>
      </div>
    </CoverSectionBox>
  );
};

UserCoverSection.propTypes = {
  userData: propTypes.object,
};

export default UserCoverSection;
