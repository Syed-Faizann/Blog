"use client";

import React from "react";
import Image from "next/image";
import logo from "@/public/me2.jpg";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between py-6 items-center px-14">
      {/* Logo */}
      <Link href='/'>
      <div className="title flex items-center gap-2">
        <Image
          src={logo}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
          />
        <h1 className="font-bold text-xl">Blog</h1>
      </div>
          </Link>

      {/* Links */}
      <div className="pages flex gap-2 items-center">
        <ul className="flex gap-6 items-center">
          <Link href="/">
            <li className="cursor-pointer font-medium text-center hover:font-bold transition-all duration-150">
              Home
            </li>
          </Link>
          <li className="cursor-pointer font-medium text-center hover:font-bold transition-all duration-150">
            Blog
          </li>
          <li className="cursor-pointer font-medium text-center hover:font-bold transition-all duration-150">
            About
          </li>

          {/* ✅ Corrected: "Post" link to /posts/create */}
          {session && (
            <Link href="/posts/create">
              <li className="cursor-pointer font-medium text-center hover:font-bold transition-all duration-150 text-blue-600">
                Post
              </li>
            </Link>
          )}
        </ul>

        {/* Auth section */}
        <div className="start-btn ml-6">
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-400 bg-red-50 px-3 py-1 rounded-2xl hover:text-red-500 cursor-pointer hover:font-bold"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="text-blue-400 bg-blue-50 px-3 py-1 rounded-2xl hover:text-blue-500 cursor-pointer hover:font-bold">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
