import React, { useEffect, useState } from 'react'
import { Input, Button, Spinner } from '@nextui-org/react'
import { EyeFilledIcon } from '../assets/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../assets/EyeSlashFilledIcon'
import { loginUser } from '../services/api'

const SignIn: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setInputError(false);
  }, [login, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(login, password);

      console.log('Login successful:', data);



    } catch (error) {
      setInputError(true);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 transition-all duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">
              Username or email
            </label>
            <Input
              id='login'
              isInvalid={inputError}
              color={inputError ? 'danger' : 'primary'}
              isClearable
              variant='faded'
              fullWidth
              placeholder="Username or email"
              required
              value={login}
              onValueChange={setLogin}
            />
          </div>
          <div className="mb-6" >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id='password'
              isInvalid={inputError}
              color={inputError ? 'danger' : 'primary'}
              errorMessage="Invalid email or password"
              variant='faded'
              fullWidth
              placeholder="Password"
              required
              value={password}
              onValueChange={setPassword}
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
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <a href="/signup" className="text-sm text-blue-500 hover:underline">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn;
