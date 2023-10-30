"use client";

import { useState, useEffect } from "react";

import React from "react";

export default function AuthForm({ handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="max-w-lg h-auto block py-2  rounded-xl"
      onSubmit={(e) => handleSubmit(e, email, password)}
    >
      <div>
        <span className="text-slate-400">Email: </span>
        <input
          className="w-full h-12 rounded-xl bg-black text-slate-400 p-2 my-4"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div>
        <span className="text-slate-400">Password: </span>
        <input
          className="w-full h-12 rounded-xl bg-black text-slate-400 p-2 my-4"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <button className="border-2 border-black rounded-lg p-4 w-full hover:bg-slate-400 hover:text-dark">
        Log In
      </button>
    </form>
  );
}
