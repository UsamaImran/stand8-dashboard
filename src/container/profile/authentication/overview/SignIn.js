import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';
import Alert from '../../../../components/alerts/alerts';

const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector(state => {
    return {
      isLoading: state.auth.loading,
      isLoggedIn: state.auth.login,
      isError: state.auth.error,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = () => {
    dispatch(login(form.getFieldsValue()));
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign in to <span style={{ color: '#280886' }}>STAND 8 DASH</span>
          </Heading>

          {isError && <Alert message={isError} description="" type="error" />}
          <p className="mb-25" />

          <Form.Item
            name="email"
            rules={[{ message: 'Please input your Email!', required: true }]}
            label="Email Address"
          >
            <Input placeholder="Email Address" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            <NavLink className="forgot-pass-link" to="/forgot-password">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="microsoft-signup" to="#">
                <img src={require('../../../../static/img/icons8_microsoft_20px.png')} alt="" />
                <span>Login with Microsoft - WORK IN PROGRESS DO NOT USE</span>
              </Link>
            </li>
          </ul>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
