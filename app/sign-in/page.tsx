"use client";

import { signIn } from "@/lib/auth-client";
import GoogleIcon from "@/components/icons/google-icon";
import { signInWithPassword } from "./_actions/sign-in";
import { useActionState } from "react";

const LoginPage = () => {
  const [state, action, isPending] = useActionState(signInWithPassword, null);

  const signInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-surface-2 p-8 shadow-xl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-fg">Welcome back</h1>

        <p className="mt-1 text-sm text-fg-muted">Sign in to continue</p>

        {/* Error handling */}
        {state?.error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
            {state.error}
          </div>
        )}
      </div>
      <form action={action} className="flex w-full max-w-sm flex-col gap-4">
        {/* Username */}
        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            className="peer bg-gnome-dark-3 w-full rounded-2xl border border-border px-5 pt-6 pb-2 text-fg transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />

          <label
            htmlFor="email"
            className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-sm text-fg-muted transition-all duration-200 peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Email
          </label>
        </div>

        {/* Password */}
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

        {/* Login */}
        <button
          type="submit"
          className="mt-2 h-12 cursor-pointer rounded-2xl bg-primary font-medium text-white transition-all duration-200 hover:bg-primary-hover focus:ring-2 focus:ring-primary/30 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Logging In" : "Login"}
        </button>

        {/* Divider */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-surface-2 px-3 text-sm text-fg-muted">OR</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="bg-gnome-dark-3 flex h-12 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-border font-medium text-fg transition-all duration-200 hover:border-border-subtle hover:bg-surface-3 focus:ring-2 focus:ring-primary/20 focus:outline-none active:scale-[0.98]"
        >
          <GoogleIcon className="h-5 w-5" />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
