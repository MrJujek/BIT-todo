import React, { useEffect, useState, useMemo } from 'react';
import { Input, Button, Spinner, Link } from '@nextui-org/react';
import { EyeFilledIcon } from '../assets/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/api';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [invalidUsername, setInvalidUsername] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
  const [emailTaken, setEmailTaken] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split('=')[0];
    if (token == 'token') {
      navigate('/');
    }
  }, []);

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalidEmail = useMemo(() => {
    setEmailTaken(false);

    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (invalidUsername || invalidPassword) {
      return;
    }

    try {
      const data = await registerUser(username, email, password);

      if (data.error) {
        if (data.error.includes('username')) {
          setUsernameTaken(true);
        } else if (data.error.includes('email')) {
          setEmailTaken(true);
        }
        setLoading(false);
        return;
      }

      await loginUser(username, password);

      navigate('/');
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    if (username.includes('@')) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
    console.log(username);

    setUsernameTaken(false);
  }, [username])

  useEffect(() => {
    if (password.length < 6 && password.length > 0) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  }, [password])

  useEffect(() => {
    console.log(!invalidUsername, !invalidPassword, !isInvalidEmail, !usernameTaken, !emailTaken);

    if (username.length > 0 && email.length > 0 && password.length >= 6 && !invalidUsername && !invalidPassword && !isInvalidEmail && !usernameTaken && !emailTaken) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [username, email, password, usernameTaken, invalidUsername, invalidPassword])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 transition-all duration-300 ease-in-out">
      <div className="flex flex-col items-center mb-6">
        <img src="/logo.svg" alt="EasyPlanner Logo" className="w-16 h-16 mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">EasyPlanner</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id='username'
              isInvalid={usernameTaken || invalidUsername}
              errorMessage={invalidUsername ? 'Username cannot contain \'@\'' :
                usernameTaken ? 'Username already taken' : ''}
              color={(usernameTaken || invalidUsername) ? 'danger' : 'primary'}
              isClearable
              variant='faded'
              fullWidth
              placeholder="Enter your username"
              required
              value={username}
              onValueChange={setUsername}
            />
          </div>
          <div className='mb-6'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              isInvalid={emailTaken || isInvalidEmail}
              errorMessage={isInvalidEmail ? 'Enter a valid email' :
                emailTaken ? 'Account with this email already exists' : ''}
              color={(isInvalidEmail || emailTaken) ? 'danger' : 'primary'}
              variant='faded'
              value={email}
              onValueChange={setEmail}
              required
              fullWidth
              placeholder="Enter your email"
            />
          </div>
          <div className='mb-6'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              isInvalid={invalidPassword}
              color={invalidPassword ? 'danger' : 'primary'}
              errorMessage="Password must be at least 6 characters long"
              variant='faded'
              value={password}
              onValueChange={setPassword}
              required
              fullWidth
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" color="primary" onClick={() => setLoading(true)} isDisabled={disabledButton}>
              {loading ? <Spinner size="sm" color='default' /> : 'Sign Up'}
            </Button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link size='sm' href='/signin' underline='hover'>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;