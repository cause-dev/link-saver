const LoginPage = () => {
  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-surface-2 p-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-fg">Welcome back</h1>

        <p className="mt-1 text-sm text-fg-muted">Sign in to continue</p>
      </div>
      <form action="#" className="flex w-full max-w-sm flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            name="username"
            id="username"
            placeholder=" "
            className="peer bg-gnome-dark-3 w-full rounded-2xl border border-border px-5 pt-6 pb-2 text-fg transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <label
            htmlFor="username"
            className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-sm text-fg-muted transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
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
            className="peer bg-gnome-dark-3 w-full rounded-2xl border border-border px-5 pt-6 pr-12 pb-2 text-fg transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />

          <label
            htmlFor="password"
            className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-sm text-fg-muted transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Password
          </label>
          <button
            type="button"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-fg-muted transition-colors hover:text-fg"
          >
            👁
          </button>
        </div>
        <button
          type="submit"
          className="mt-2 h-12 rounded-2xl bg-primary font-medium text-white transition-all duration-200 hover:bg-primary-hover focus:ring-2 focus:ring-primary/30 focus:outline-none active:scale-[0.98]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
