import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Radio, Spin } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import Alert from '../../../../../components/alerts/alerts';
import { Button } from '../../../../../components/buttons/buttons';
import { role } from '../../../../../config/userRole';
import { screens } from '../../../../../config/screens';
import { updateEditUser } from '../../../../../redux/editUser/actionCreator';

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

const accessLevelValueOpts = screens
  .map(screen => {
    if (Array.isArray(screen?.menuItems)) {
      return screen.menuItems.map(item => item.value);
    }
    return [screen.value];
  })
  .flat();

const UserAdminSettings = () => {
  const dispatch = useDispatch();

  const { editUserData, loggedinUser, editUserErr, editUserLoading } = useSelector(reduxState => {
    return {
      editUserData: reduxState.editUser.editUser,
      loggedinUser: reduxState.auth.user,
      editUserErr: reduxState.editUser.error,
      editUserLoading: reduxState.editUser.loading,
    };
  });

  const [accessPageValues, setAccessPageValues] = useState([]);
  const [accessRole, setAccessRole] = useState(null);

  useEffect(() => {
    const accessValues =
      editUserData && editUserData.access.map(item => accessLevelOpts.filter(opt => opt.key === item)[0]?.value);
    setAccessPageValues(accessValues);
    setAccessRole(editUserData?.role);
  }, [editUserData]);

  let responseAlert = '';
  if (editUserErr != null && editUserErr.status === 404) {
    responseAlert = <Alert message="error" description="" type="error" />;
  } else if (editUserErr != null) {
    responseAlert = <Alert message="success" description="" type="success" />;
  }

  const handleChangeAccessLevelOpts = values => {
    setAccessPageValues(values);
  };

  const onChangeRole = e => {
    if (e.target.value === 'superAdmin') {
      setAccessRole(e.target.value);
      setAccessPageValues(accessLevelValueOpts);
    } else {
      setAccessRole(e.target.value);
    }
  };

  const handleSubmit = () => {
    const accessKeyOpts = accessPageValues
      .map(item => accessLevelOpts.filter(accessLevelOpt => accessLevelOpt.value === item)[0].key)
      .flat();
    const user = { id: editUserData.id, access: accessKeyOpts, role: accessRole };

    dispatch(updateEditUser(user));
  };

  const cancel = () => {
    const accessValues =
      editUserData && editUserData.access.map(item => accessLevelOpts.filter(opt => opt.key === item)[0]?.value);
    setAccessPageValues(accessValues);
    setAccessRole(editUserData?.role);
  };

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Access Level</Heading>
          <span>You can set user access level</span>
        </div>
      }
    >
      {accessPageValues && accessRole && (
        <Row justify="center">
          <Col xl={20} lg={24} xs={24}>
            {responseAlert}
            <p className="mb-25" />

            <BasicFormWrapper>
              {editUserLoading && (
                <div className="loading-spin">
                  <Spin size="large" />
                </div>
              )}
              <Col sm={24} xs={24}>
                {accessRole && (
                  <Radio.Group onChange={onChangeRole} value={accessRole} size="small">
                    <Radio.Button value="superAdmin" disabled={loggedinUser.role !== 'superAdmin'}>
                      {role.superAdmin}
                    </Radio.Button>
                    <Radio.Button
                      value="admin"
                      disabled={loggedinUser.role === 'recruiterManager' || loggedinUser.role === 'salesManager'}
                    >
                      {role.admin}
                    </Radio.Button>
                    <Radio.Button value="salesManager">{role.salesManager}</Radio.Button>
                    <Radio.Button value="recruiterManager">{role.recruiterManager}</Radio.Button>
                    <Radio.Button value="recruiter">{role.recruiter}</Radio.Button>
                    <Radio.Button value="salesperson">{role.salesperson}</Radio.Button>
                  </Radio.Group>
                )}

                <Select
                  disabled={loggedinUser.role === 'manager' || accessRole === 'superAdmin'}
                  mode="multiple"
                  style={{ width: '100%', marginTop: '16px', minHeight: '100px' }}
                  placeholder="Please select"
                  value={accessPageValues}
                  onChange={handleChangeAccessLevelOpts}
                  options={accessLevelOpts}
                />
              </Col>

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

export default UserAdminSettings;
