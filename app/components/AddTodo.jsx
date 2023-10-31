"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState } from "react";

function AddTodo({ userID }) {
  const supabase = createClientComponentClient();
  async function handleClick(e) {
    e.preventDefault();
    const { error } = await supabase.from("todos").insert({
      user_id: { userID },
      task: "Example",
      is_complete: false,
      inserted_at: new Date().toISOString(),
    });
  }

  return (
    <form className="flex flex-col items-center gap-5 w-full">
      <input
        className="h-12 rounded-md text-center w-full"
        type="text"
        name="title"
        placeholder="todo title"
        value="example"
      ></input>
      <button
        onClick={handleClick}
        className="bg-indigo-400 dark:bg-slate-900 hover:bg-indigo-300 hover:dark:bg-slate-700 text-white rounded-lg p-4"
      >
        ADD
      </button>
    </form>
  );
}

export default AddTodo;
