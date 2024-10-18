import React, { useEffect, useState } from 'react';
import { Input, Button, Spinner, user } from '@nextui-org/react';
import { EyeFilledIcon } from '../assets/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon'

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [invalidUsername, setInvalidUsername] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameTaken, setUsernameTaken] = useState<boolean>(false);
  const [invalidPassword, setInvalidPassword] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      // const data = await loginUser(login, password);

      // console.log('Login successful:', data);
      throw Error


    } catch (error) {
      // setInputError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username.includes('@')) {
      setInvalidUsername(true);
    } else {
      setInvalidUsername(false);
    }
  }, [username])

  useEffect(() => {
    if (password.length < 6) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  }, [password])

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
              isInvalid={usernameTaken || invalidUsername}
              errorMessage={invalidUsername ? 'Username cannot contain \'@\'' :
                usernameTaken ? 'Username already taken' : ''}
              color={(usernameTaken || invalidUsername) ? 'danger' : 'primary'}
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
            <Button type="submit" color="primary" onClick={() => setLoading(true)}>
              {loading ? <Spinner size="sm" color='default' /> : 'Sign Up'}
            </Button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <a href="/signin" className="text-sm text-blue-500 hover:underline">Sign In</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;