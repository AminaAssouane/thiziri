"use client";

import { Suspense, useState, type SubmitEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const providerError = searchParams.get("error");

  const visibleError =
    error ||
    (providerError === "OAuthAccountNotLinked"
      ? "An account with this email already exists. Sign in with your email and password."
      : providerError
        ? "Google sign-in failed. Please try again."
        : "");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input"
        required
      />
      {visibleError && <p style={{ color: "red" }}>{visibleError}</p>}
      <button type="submit" disabled={loading} className="button mb-4">
        {loading ? "Logging in..." : "Log in"}
      </button>
      <button
        type="button"
        onClick={() =>
          signIn("google", { redirectTo: "/dashboard/health-profile" })
        }
        className="inline-flex hover:bg-gray-300 items-center justify-center gap-3 rounded-full border border-[#dadce0] bg-white px-6 py-3 cursor-pointer font-medium text-[#3c4043] shadow-sm transition hover:bg-[#f8faff] hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2"
      >
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.26-2.08 3.57-5.14 3.57-8.85Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.93l-3.87-3c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.1-6.72-4.93H1.28v3.09A12 12 0 0 0 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.28a12 12 0 0 0 0 10.76l4-3.09Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.78c1.77 0 3.35.61 4.6 1.81l3.43-3.43A11.48 11.48 0 0 0 12 0 12 12 0 0 0 1.28 6.62l4 3.09C6.23 6.88 8.88 4.78 12 4.78Z"
          />
        </svg>
        Continue with Google
      </button>
      <div className="mt-2 text-center">
        Don't have an account?{" "}
        <Link href="/signup" className="font-bold">
          Sign up!
        </Link>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
