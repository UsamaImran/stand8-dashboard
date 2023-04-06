import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Form, Input, Button, Checkbox } from 'antd';
import { AuthWrapper } from './style';
import { register, initRegister } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';
import Alert from '../../../../components/alerts/alerts';

const SignUp = () => {
  const history = useHistory();
  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { isLoading, error, registering } = useSelector(Rstate => {
    return {
      isLoading: Rstate.auth.reg_loading,
      error: Rstate.auth.reg_error,
      registering: Rstate.auth.signup,
    };
  });

  const handleSubmit = values => {
    setState({ ...state, values });
    dispatch(register(values));
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  if (registering) {
    dispatch(initRegister());
    history.push('/login');
  }

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/login">Sign In</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign Up to <span className="color-secondary">STAND8 Dashboard</span>
          </Heading>

          {error && <Alert message={error} description="" type="error" />}
          <p className="mb-25" />

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your First name!' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your Last name!' }]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>
              Creating an account means you’re okay with our Terms of Service and Privacy Policy
            </Checkbox>
          </div>
          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Create Account'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
