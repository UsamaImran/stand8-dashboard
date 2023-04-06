import React, { useState, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Form, Input, Select } from 'antd';
import { AccountWrapper } from '../style';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../../styled';
import Heading from '../../../../../components/heading/heading';
import { alertModal } from '../../../../../components/modals/antd-modals';
import Alert from '../../../../../components/alerts/alerts';
import { updateEditUser } from '../../../../../redux/editUser/actionCreator';

import { deleteUser } from '../../../../../redux/users/actionCreator';

const { Option } = Select;

const UserAccount = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const formRef = createRef();

  const { editUserData, editUserErr, editUserLoading } = useSelector(reduxState => {
    return {
      editUserData: reduxState.editUser.editUser,
      editUserErr: reduxState.editUser.error,
      editUserLoading: reduxState.editUser.loading,
    };
  });

  const [state, setState] = useState({
    firstName: editUserData.firstName,
    lastName: editUserData.lastName,
    email: editUserData.email,
    verified: editUserData.verified ? editUserData.verified : false,
  });

  const handleSubmit = values => {
    setState({ ...state, values });
    dispatch(updateEditUser({ ...values, id: editUserData.id }));
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
  if (editUserErr != null && editUserErr.status === 404) {
    responseAlert = <Alert message="error" description="" type="error" />;
  } else if (editUserErr != null) {
    responseAlert = <Alert message="success" description="" type="success" />;
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
                        <Form.Item name="verified" initialValue={state?.verified} label="Status">
                          <Select disabled={editUserLoading}>
                            <Option value>Verified</Option>
                            <Option value={false}>Not verified</Option>
                          </Select>
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
                            <Button size="small" type="danger" onClick={() => closeAccountConfirm(editUserData.id)}>
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

export default UserAccount;
