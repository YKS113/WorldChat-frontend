import React, { useState, useEffect } from 'react';
import Form from '../../components/Form';
import TextInput from '../../components/TextInput';
import { PrimaryButton } from '../../components/Button';
import Avatar, { MultiAvatar } from '../../components/Avatar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { authAPI } from '../../api';
import { useAuthContext } from '../../context/AuthContext';
import { errorToast, warningToast } from '../../utils/toastify';
import { useSocketContext } from '../../context/SocketContext';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { setUser, setToken } = useAuthContext();
  const { socketConnect } = useSocketContext();
  const { error, isLoading, sendRequest: postLogin } = useAxios();

  useEffect(() => {
    if (error?.errors) {
      error.errors.forEach((e) => {
        errorToast(e.msg);
      });
    } else if (error?.message) {
      errorToast(error.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      warningToast('All fields are required!');
      return;
    }
    postLogin(
      {
        method: 'POST',
        url: authAPI.login,
        data: { ...formData }
      },
      (data) => {
        const { accessToken, ...other } = data.data;
        setUser({ ...other });
        setToken({ accessToken });
        socketConnect();
      }
    );
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleTestLogin =  (username,password) => {
     setFormData((prev) => ({
      ...prev,
      username: username,
      password: password
    }));
  };

  return (
    <Cont>
    <Form onSubmit={handleSubmit}>
      <FormTitle>Login</FormTitle>
      <TextInput
        type="text"
        placeholder="User Name"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <TextInput
        type="password"
        placeholder="Password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <PrimaryButton>{isLoading ? 'Loading...' : 'Login'}</PrimaryButton>
      <LoginSpan>
        Do not have an account ?
        <Link to="/signup">
          <span>sign up</span>
        </Link>
      </LoginSpan>
    </Form>
    <TestLoginWidget>
    Login with test accounts
    <div onClick={()=>handleTestLogin("Alice","test@1234")}>
    <MultiAvatar
        key={"Alice"}
        size="small"
        src={'/AliceTestAvatar.svg'}
      />Alice</div>
    <div onClick={()=>handleTestLogin("Bob","test@1234")}>
      <MultiAvatar
        key={"Bob"}
        size="small"
        src={'/BobTestAvatar.svg'}
      />Bob</div>
    </TestLoginWidget>
    </Cont>
  );
}

const Cont = styled.h1`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: center;
  margin: 0.5rem 0;
`;

const LoginSpan = styled.p`
  font-size: 0.75rem;

  a {
    text-decoration: none;
  }

  span {
    margin-left: 0.5rem;
    color: var(--danger);
    font-weight: 500;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const TestLoginWidget = styled.div`
  /* width: 80%; */
  /* min-width: 80px;
  max-width: 50px; */

  background-color: var(--bg-color-main);
  padding: 1rem 1rem;
  border-radius: 4px;
  font-size: 1.25rem;
  font-weight: 500;
  -webkit-letter-spacing: 1px;
  -moz-letter-spacing: 1px;
  -ms-letter-spacing: 1px;
  letter-spacing: 1px;
  box-shadow: ${(props) => (props.theme.mode === 'light' ? '3px 3px 10px #e2e2e2' : '3px 3px 10px #131313')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  align-self: flex-start;
  margin-left: 2rem;
  display: flex;
  justify-content: center;
  align-items: baseline;
  /* text-transform: capitalize; */
  line-height: 2rem;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    align-self: center;
    width: 80%;
    margin-top: 1rem;
  }
  div{
    color: var(--primary);
    cursor: pointer;
    text-transform: capitalize;
    font-size: 1.25rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

export default LoginForm;
