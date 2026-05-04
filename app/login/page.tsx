const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-surface-2 p-3 rounded-3xl">
      <h2 className="mb-4 text-xl font-bold">Login</h2>
      <form
        action="#"
        className="flex flex-col justify-center items-center gap-4"
      >
        <div className="relative">
          <input
            type="text"
            name="username"
            id="username"
            placeholder=" "
            className="bg-surface-3 peer w-full rounded-lg
            bg-gnome-dark-3 border border-border
            px-4 pt-6 pb-2
            text-fg
            focus:outline-none focus:border-border-subtle
            transition-colors"
          />
          <label
            htmlFor="username"
            className="
            absolute left-4 top-4
            text-fg-muted text-sm
            transition-all
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-fg-muted
            peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Username
          </label>
        </div>
        <div className="relative">
          <input
            type="text"
            name="password"
            id="password"
            placeholder=" "
            className="bg-surface-3 peer w-full rounded-lg
            bg-gnome-dark-3 border border-border
            px-4 pt-6 pb-2
            text-fg
            focus:outline-none focus:border-border-subtle
            transition-colors"
          />
          <label
            htmlFor="password"
            className="
            absolute left-4 top-4
            text-fg-muted text-sm
            transition-all
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-2 peer-focus:text-xs peer-focus:text-fg-muted
            peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-hover cursor-pointer w-22 h-10 rounded-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
