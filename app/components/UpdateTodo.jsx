"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

function UpdateTodo(todo) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  console.log(todo);

  async function handleClick(e) {
    //todo.is_complete ? setIsCompleted(!isCompleted);
    e.preventDefault();

    const { error } = await supabase.from("todos").update({
      is_complete: false,
    });
    router.refresh();
  }
  return (
    <form>
      <input
        type="checkbox"
        className="h-12 w-12 rounded-full accent-indigo-400 text-indigo-600"
      ></input>
    </form>
  );
}

export default UpdateTodo;
