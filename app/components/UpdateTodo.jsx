"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

function UpdateTodo(props) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [selectedTodo, setselectedTodo] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  async function handleChange(e) {
    setselectedTodo(e.target.id);
    console.log(props);
    e.preventDefault();
    const { error } = await supabase.from("todos").upsert({
      user_id: props.authuser.id,
      id: selectedTodo,
      is_complete: false,
    });
    router.refresh();
  }

  console.log(isComplete);

  return (
    <form>
      <input
        id={props.todo.id}
        type="checkbox"
        name="is_complete"
        value={props.todo.is_complete}
        checked={props.todo.is_complete}
        className="h-12 w-12 rounded-full accent-indigo-400 text-indigo-600"
        onChange={(e) => handleChange(e)}
      ></input>
    </form>
  );
}

export default UpdateTodo;
