import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Row, Col, Select, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { Button } from '../../../../components/buttons/buttons';
import { getProfile, updateProfile, responseReset } from '../../../../redux/profile/actionCreator';
import Alert from '../../../../components/alerts/alerts';
import { role } from '../../../../config/userRole';
import { screens } from '../../../../config/screens';

import { changeUserInfo } from '../../../../redux/authentication/actionCreator';

const accessLevelOpts = screens
  .map(screen => {
    if (Array.isArray(screen?.menuItems)) {
      return screen.menuItems.map(ite => ({ key: ite.key, value: ite.value }));
    }
    return [
      {
        key: screen.key,
        value: screen.value,
      },
    ];
  })
  .flat();

const AdminSettings = () => {
  const dispatch = useDispatch();
  const [accessPageValues, setAccessPageValues] = useState([]);

  const { profileData, responseUpdate } = useSelector(reduxState => {
    return {
      profileData: reduxState.profile.profile,
      responseUpdate: reduxState.profile.responseUpdate,
    };
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    const accessValues =
      profileData && profileData.access.map(item => accessLevelOpts.filter(opt => opt.key === item)[0]?.value);
    setAccessPageValues(accessValues);
  }, [profileData]);

  let responseAlert = '';
  if (responseUpdate != null && responseUpdate.status === 'error') {
    responseAlert = <Alert message={responseUpdate.message} description="" type="error" />;
  } else if (responseUpdate != null) {
    responseAlert = <Alert message={responseUpdate.message} description="" type="success" />;
  }

  const handleChangeAccessLevelOpts = values => {
    setAccessPageValues(values);
  };

  const handleSubmit = () => {
    const accessKeyOpts = accessPageValues
      .map(item => accessLevelOpts.filter(accessLevelOpt => accessLevelOpt.value === item)[0].key)
      .flat();

    dispatch(updateProfile({ id: profileData.id, access: accessKeyOpts })).then(() => {
      const user = JSON.parse(Cookies.get('user'));
      user.access = accessKeyOpts;
      Cookies.set('user', user);
      dispatch(changeUserInfo(user));
      setTimeout(() => dispatch(responseReset()), 4000);
    });
  };

  const cancel = () => {
    const accessValues =
      profileData && profileData.access.map(item => accessLevelOpts.filter(opt => opt.key === item)[0]?.value);
    setAccessPageValues(accessValues);
  };

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Access Level</Heading>
          <span>You can&apos;t set your access level yourself</span>
        </div>
      }
    >
      {profileData && (
        <Row justify="center">
          <Col xl={20} lg={24} xs={24}>
            {responseAlert}
            <p className="mb-25" />

            <BasicFormWrapper>
              <div style={{ paddingBottom: '10px', fontWeight: 500 }}> Access Level:</div>

              <Radio.Group>
                <Radio.Button value="superAdmin" disabled={profileData?.role !== 'superAdmin'}>
                  {role.superAdmin}
                </Radio.Button>
                <Radio.Button value="admin" disabled={profileData?.role !== 'admin'}>
                  {role.admin}
                </Radio.Button>
                <Radio.Button value="recruiterManager" disabled={profileData?.role !== 'recruiterManager'}>
                  {role.recruiterManager}
                </Radio.Button>
                <Radio.Button value="salesManager" disabled={profileData?.role !== 'salesManager'}>
                  {role.salesManager}
                </Radio.Button>
                <Radio.Button value="recruiter" disabled={profileData?.role !== 'recruiter'}>
                  {role.recruiter}
                </Radio.Button>
                <Radio.Button value="salesperson" disabled={profileData?.role !== 'salesperson'}>
                  {role.salesperson}
                </Radio.Button>
              </Radio.Group>
              <div style={{ paddingTop: '24px', paddingBottom: '10px', fontWeight: 500 }}>Access Pages:</div>

              <Select
                disabled={profileData.role !== 'superAdmin'}
                mode="multiple"
                style={{ width: '100%', marginTop: '16px', minHeight: '100px' }}
                placeholder="Please select"
                value={accessPageValues}
                onChange={handleChangeAccessLevelOpts}
                options={accessLevelOpts}
              />

              <div className="account-action">
                <div className="setting-form-actions">
                  <Button size="default" onClick={handleSubmit} type="primary">
                    Save Change
                  </Button>
                  &nbsp; &nbsp;
                  <Button size="default" onClick={cancel} type="light">
                    Cancel
                  </Button>
                </div>
              </div>
            </BasicFormWrapper>
          </Col>
        </Row>
      )}
    </Cards>
  );
};

export default AdminSettings;
