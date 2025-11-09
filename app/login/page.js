"use client";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  // ✅ Handle credentials login
  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      alert("Invalid credentials");
    }
  }

  // ✅ Handle GitHub login
  async function handleGitHubLogin() {
    await signIn("github", { callbackUrl: "/" });
  }

  return (
    <div className="main flex justify-center items-center min-h-screen bg-blue-200">
      <div className="card w-96 bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-8 text-blue-500">Login</h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-600 font-medium"
            >
              Username / Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                account_circle
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-gray-600 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                lock
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 transition"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-xl mt-4 hover:bg-blue-600 transition font-medium"
          >
            Login
          </button>

          <p className="text-sm text-gray-500 text-center mt-2">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>

        {/* OR Divider */}
        <div className="flex items-center gap-2 w-full mt-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* GitHub Login */}
        <button
          onClick={handleGitHubLogin}
          className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md mt-4 transition"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.41 2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.23 0 1.61-.02 2.91-.02 3.31 0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Login with GitHub
        </button>
      </div>
    </div>
  );
}
