import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePasswordWrapper } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { changePass } from '../../../../redux/authentication/actionCreator';
import Alert from '../../../../components/alerts/alerts';
import { getUsers } from '../../../../redux/users/actionCreator';

const Password = () => {
  const dispatch = useDispatch();

  const { responseMsg, loggedinUser } = useSelector(state => {
    return {
      responseMsg: state.auth.change_pass_res,
      loggedinUser: state.auth.user,
    };
  });
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = values => {
    dispatch(changePass({ ...values, id: loggedinUser.id }));
  };

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  let responseAlert = '';
  if (responseMsg != null && responseMsg.status === 400) {
    responseAlert = <Alert message={responseMsg.data.message} description="" type="error" />;
  } else if (responseMsg != null) {
    responseAlert = <Alert message={responseMsg.message} description="" type="success" />;
  }

  return (
    <ChangePasswordWrapper>
      <Cards
        title={
          <div className="setting-card-title">
            <Heading as="h4">Password Settings:</Heading>
            <span>Change or reset your account password</span>
          </div>
        }
      >
        <Row justify="center">
          <Col lg={12} sm={20} xs={24}>
            <BasicFormWrapper>
              <Form form={form} name="changePassword" onFinish={handleSubmit}>
                {responseAlert}
                <Form.Item
                  name="oldPassword"
                  label="Old Password"
                  rules={[{ required: true, message: 'Please input old password!' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: 'Please input new password!' },
                    { type: 'string', min: 8, message: 'Password must be 8 or more characters.' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <p className="input-message">Minimum 8 characters</p>
                <Form.Item>
                  <div className="setting-form-actions">
                    <Button htmlType="submit" type="primary">
                      Change Password
                    </Button>
                    &nbsp; &nbsp;
                    <Button size="default" onClick={handleCancel} type="light">
                      Cancel
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </BasicFormWrapper>
          </Col>
        </Row>
      </Cards>
    </ChangePasswordWrapper>
  );
};

export default Password;
