import React from 'react'
import { Input, Button } from '@nextui-org/react'

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <Input
              isClearable
              variant='underlined'
              fullWidth
              placeholder="Email"
              type="email"
              required
            />
          </div>
          <div className="mb-6">
            <Input
              isClearable
              variant='underlined'
              fullWidth
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <Button type="submit" color="primary">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login;
