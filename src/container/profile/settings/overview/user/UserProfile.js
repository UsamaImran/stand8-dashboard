import React, { useState } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import { updateEditUser } from '../../../../../redux/editUser/actionCreator';

import Alert from '../../../../../components/alerts/alerts';
import TIMEZONES from '../../../../../components/utilities/timezones';

const { Option } = Select;
const UserProfile = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [state, setState] = useState({
    tags: ['UI/UX', 'Branding', 'Product Design', 'Web Design'],
    values: null,
  });

  const { editUserData, editUserErr } = useSelector(reduxState => {
    return {
      editUserData: reduxState.editUser.editUser,
      editUserErr: reduxState.editUser.error,
      editUserLoading: reduxState.editUser.loading,
    };
  });

  const handleSubmit = values => {
    setState({ ...state, values: { ...values, tags: state.tags } });
    dispatch(updateEditUser({ ...values, id: editUserData.id }));
  };

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  let responseAlert = '';
  if (editUserErr != null && editUserErr.status === 404) {
    responseAlert = <Alert message="error" description="" type="error" />;
  } else if (editUserErr != null) {
    responseAlert = <Alert message="success" description="" type="success" />;
  }

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Edit Profile</Heading>
          <span>Set Up User Personal Information</span>
        </div>
      }
    >
      {editUserData && (
        <Row justify="center">
          <Col xl={12} lg={16} xs={24}>
            {responseAlert}
            <p className="mb-25" />

            <BasicFormWrapper>
              <Form name="editProfile" form={form} onFinish={handleSubmit}>
                <Form.Item
                  name="firstName"
                  initialValue={editUserData ? editUserData.firstName : ''}
                  label="First Name"
                >
                  <Input />
                </Form.Item>
                <Form.Item name="lastName" initialValue={editUserData ? editUserData.lastName : ''} label="Last Name">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  initialValue={editUserData ? editUserData.phoneNumber : ''}
                  label="Phone Number"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="timezone"
                  initialValue={editUserData ? editUserData.timezone : 'US/Eastern'}
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

export default UserProfile;
