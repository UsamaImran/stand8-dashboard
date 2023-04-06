import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Row, Col, Form, Input } from 'antd';
import { AccountWrapper } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { alertModal } from '../../../../components/modals/antd-modals';
import Alert from '../../../../components/alerts/alerts';
import { getProfile, updateProfile, responseReset } from '../../../../redux/profile/actionCreator';
import { changeUserInfo } from '../../../../redux/authentication/actionCreator';
import { deleteUser } from '../../../../redux/users/actionCreator';

const Account = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const formRef = createRef();

  const { profileData, responseUpdate } = useSelector(reduxState => {
    return {
      profileData: reduxState.profile.profile,
      responseUpdate: reduxState.profile.responseUpdate,
    };
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const [state, setState] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
  });

  const handleSubmit = values => {
    setState({ ...state, values });
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
    formRef.current.resetFields();
  };

  const closeAccountConfirm = userId => {
    alertModal.confirm({
      title: 'Are you sure to delete your account?',
      content: '',
      onOk() {
        dispatch(deleteUser(userId));
      },
      onCancel() {},
    });
  };

  let responseAlert = '';
  if (responseUpdate != null && responseUpdate.status === 'error') {
    responseAlert = <Alert message={responseUpdate.message} description="" type="error" />;
  } else if (responseUpdate != null) {
    responseAlert = <Alert message={responseUpdate.message} description="" type="success" />;
  }

  return (
    <AccountWrapper>
      <Cards
        title={
          <div className="setting-card-title">
            <Heading as="h4">Account Settings</Heading>
            <span>Update your username and manage your account</span>
          </div>
        }
      >
        <Row>
          <Col xs={24}>
            {responseAlert}
            <BasicFormWrapper>
              <Form form={form} ref={formRef} name="editAccount" onFinish={handleSubmit}>
                <div className="account-form-top">
                  <Row justify="center">
                    <Col xxl={10} lg={16} md={18} xs={24}>
                      <div className="account-form">
                        <Form.Item name="firstName" initialValue={state.firstName} label="First Name">
                          <Input />
                        </Form.Item>
                        <Form.Item name="lastName" initialValue={state.lastName} label="Last Name">
                          <Input />
                        </Form.Item>

                        <Form.Item name="email" initialValue={state.email} label="Email">
                          <Input />
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="account-form-bottom">
                  <Row justify="center">
                    <Col xxl={10} lg={16} md={18} xs={24}>
                      <div className="account-closing">
                        <Row>
                          <Col lg={18} md={24} sm={18} xs={24}>
                            <Heading className="account-closing__title" as="h4">
                              Close Account
                            </Heading>
                            <p>Delete Your Account and Account data</p>
                          </Col>
                          <Col lg={6} md={24} sm={6} xs={24}>
                            <Button size="small" type="danger" onClick={() => closeAccountConfirm(profileData.id)}>
                              Close Account
                            </Button>
                          </Col>
                        </Row>
                      </div>
                      <div className="account-action">
                        <div className="setting-form-actions">
                          <Button size="default" htmlType="submit" type="primary">
                            Save Change
                          </Button>
                          &nbsp; &nbsp;
                          <Button size="default" onClick={handleCancel} type="light">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </AccountWrapper>
  );
};

export default Account;
