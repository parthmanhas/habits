export default function SignIn() {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
