import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
import { updatePass } from '../../../../redux/authentication/actionCreator';
import Alert from '../../../../components/alerts/alerts';

const ResetPassword = () => {
  const { token } = useParams();

  const dispatch = useDispatch();

  const responseMsg = useSelector(state => state.auth.update_pass_res);

  const [state, setState] = useState({
    values: null,
  });

  const handleSubmit = values => {
    setState({ ...state, values });
    dispatch(updatePass({ password: values.password, token }));
  };

  let responseAlert = '';
  if (responseMsg != null && responseMsg.status === 'error') {
    responseAlert = <Alert message={responseMsg.message} description="" type="error" />;
  } else if (responseMsg != null) {
    responseAlert = <Alert message={responseMsg.message} description="" type="success" />;
  }

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">Please reset your password</Heading>

          {responseAlert}
          <p className="mb-25" />

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large">
              Change Password
            </Button>
          </Form.Item>
          <p className="return-text">
            Return to <NavLink to="/login">Sign In</NavLink>
          </p>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
