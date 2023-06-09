import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
import { forgotPass } from '../../../../redux/authentication/actionCreator';
import Alert from '../../../../components/alerts/alerts';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const responseMsg = useSelector(state => state.auth.forgot_pass_res);

  const [state, setState] = useState({
    values: null,
  });

  const handleSubmit = values => {
    setState({ ...state, values });

    dispatch(forgotPass(values));
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
          <Heading as="h3">Forgot Password?</Heading>

          {responseAlert}
          <p className="mb-25" />

          <p className="forgot-text">
            Enter the email address you used when you joined and we’ll send you a link to reset your password.
          </p>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large">
              Send Reset Link
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

export default ForgotPassword;
