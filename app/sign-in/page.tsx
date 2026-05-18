const LoginPage = () => {
  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-surface-2 p-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-fg">Welcome back</h1>

        <p className="mt-1 text-sm text-fg-muted">Sign in to continue</p>
      </div>
      <form action="#" className="w-full max-w-sm flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            name="username"
            id="username"
            placeholder=" "
            className="peer w-full rounded-2xl
        border border-border
        bg-gnome-dark-3
        px-5 pt-6 pb-2
        text-fg
        transition-all duration-200

        focus:outline-none
        focus:border-primary
        focus:ring-2
        focus:ring-primary/20"
          />
          <label
            htmlFor="username"
            className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-fg-muted transition-all duration-200 pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:translate-y-0"
          >
            Username
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            placeholder=" "
            className="peer w-full rounded-2xl border border-border bg-gnome-dark-3 px-5 pt-6 pb-2 pr-12 text-fg transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <label
            htmlFor="password"
            className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-fg-muted transition-all duration-200 pointer-events-none peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-focus:translate-y-0 peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:translate-y-0"
          >
            Password
          </label>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg transition-colors"
          >
            👁
          </button>
        </div>
        <button
          type="submit"
          className="mt-2 h-12 rounded-2xl bg-primary text-white font-medium transition-all duration-200 hover:bg-primary-hover active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
