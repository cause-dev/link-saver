"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth-client";

export async function signInWithPassword(
  prevState: unknown,
  formData: FormData,
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) return { error: "Already Logged In" };

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and Password are required!" };
  }

  try {
    await signIn.email({
      email,
      password,
      callbackURL: "/",
    });
  } catch (e) {
    console.log(e);
  }

  return { success: true };
}
