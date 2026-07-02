"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/auth";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    const result = await registerUser({ email, password, firstName, lastName });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // auto sign-in after successful registration
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.error) {
      setError("Account created, but sign-in failed. Try logging in.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First name" required />
      <input name="lastName" placeholder="Last name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}
