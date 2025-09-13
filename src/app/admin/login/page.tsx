import { login, signup } from '@/app/admin/login/actions' // Fix import path

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            formAction={login}
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Log in
          </button>

          {/* Remove signup for admin, or move to separate page */}
          <button
            formAction={signup}
            type="button"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}