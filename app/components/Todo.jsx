"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

function Todo({ todo }) {
  const supabase = createClientComponentClient();
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);

  const toggle = async () => {
    try {
      const { data } = await supabase
        .from("todos")
        .update({ is_complete: !isCompleted })
        .eq("id", todo.id)
        .throwOnError()
        .select()
        .single();

      if (data) setIsCompleted(data.is_complete);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="relative flex justify-between items-center rounded-md bg-red-300 h-20 w-full p-1">
      <p className="text-2xl">{todo.task}</p>
      <input
        className="cursor-pointer"
        onChange={(e) => toggle()}
        type="checkbox"
        checked={isCompleted ? true : false}
      />
    </div>
  );
}

export default Todo;
