"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

function AddTodo({ authUser }) {
  const supabase = createClientComponentClient();

  const [task, setTask] = useState("");

  async function handleClick(e) {
    e.preventDefault();
    const { error } = await supabase.from("todos").insert({
      user_id: authUser.id,
      task: task,
      is_complete: false,
      inserted_at: new Date().toISOString(),
    });
    setTask("");
  }

  return (
    <form className="flex flex-col items-center gap-5 w-full pb-2">
      <input
        className="h-12 rounded-md text-center w-full lg:w-1/2 self-center"
        type="text"
        name="task"
        placeholder="Enter new task here..."
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) => (e.target.placeholder = "Enter new task here...")}
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      ></input>
      <button
        onClick={handleClick}
        className="hidden bg-indigo-400 dark:bg-slate-900 hover:bg-indigo-300 hover:dark:bg-slate-700 text-white rounded-lg p-4"
      >
        ADD
      </button>
    </form>
  );
}

export default AddTodo;
