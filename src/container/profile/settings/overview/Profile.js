/**
 * todo: need to profile redux
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { getProfile, updateProfile, responseReset } from '../../../../redux/profile/actionCreator';
import { changeUserInfo } from '../../../../redux/authentication/actionCreator';
import Alert from '../../../../components/alerts/alerts';
import TIMEZONES from '../../../../components/utilities/timezones';

const { Option } = Select;
const Profile = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [state, setState] = useState({
    tags: ['UI/UX', 'Branding', 'Product Design', 'Web Design'],
    values: null,
  });

  const { profileData, responseUpdate } = useSelector(reduxState => {
    return {
      profileData: reduxState.profile.profile,
      responseUpdate: reduxState.profile.responseUpdate,
    };
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleSubmit = values => {
    setState({ ...state, values: { ...values, tags: state.tags } });

    dispatch(updateProfile({ ...values, id: profileData.id })).then(() => {
      const user = JSON.parse(Cookies.get('user'));
      user.timezone = values.timezone;
      Cookies.set('user', user);
      dispatch(changeUserInfo(user));
      setTimeout(() => dispatch(responseReset()), 4000);
    });
  };

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  let responseAlert = '';
  if (responseUpdate != null && responseUpdate.status === 'error') {
    responseAlert = <Alert message={responseUpdate.message} description="" type="error" />;
  } else if (responseUpdate != null) {
    responseAlert = <Alert message={responseUpdate.message} description="" type="success" />;
  }

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Edit Profile</Heading>
          <span>Set Up Personal Information</span>
        </div>
      }
    >
      {profileData && (
        <Row justify="center">
          <Col xl={12} lg={16} xs={24}>
            {responseAlert}
            <p className="mb-25" />

            <BasicFormWrapper>
              <Form name="editProfile" form={form} onFinish={handleSubmit}>
                <Form.Item name="firstName" initialValue={profileData ? profileData.firstName : ''} label="First Name">
                  <Input />
                </Form.Item>
                <Form.Item name="lastName" initialValue={profileData ? profileData.lastName : ''} label="Last Name">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  initialValue={profileData ? profileData.phoneNumber : ''}
                  label="Phone Number"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="timezone"
                  initialValue={profileData ? profileData.timezone : 'US/Eastern'}
                  label="Timezone"
                >
                  <Select>
                    {TIMEZONES.map((timezone, index) => (
                      <Option value={timezone} key={index}>
                        {timezone}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <div className="setting-form-actions">
                  <Button size="default" htmlType="submit" type="primary">
                    Update Profile
                  </Button>
                  &nbsp; &nbsp;
                  <Button size="default" onClick={handleCancel} type="light">
                    Cancel
                  </Button>
                </div>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      )}
    </Cards>
  );
};

export default Profile;
