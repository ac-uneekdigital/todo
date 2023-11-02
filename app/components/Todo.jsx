"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

//icons
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function Todo({ todo, onDelete }) {
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
    <div className="flex gap-4 items-center rounded-md text-white bg-indigo-800 dark:bg-slate-800 h-20 w-full p-1">
      <p className="text-2xl">{todo.task}</p>
      <FaEdit
        className="text-indigo-400 hover:text-indigo-300 cursor-pointer ml-auto"
        size={36}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
      />
      <div className="flex justify-center items-center">
        <input
          className="appearance-none peer cursor-pointer bg-indigo-400 hover:bg-indigo-300 checked:accent-green-300 h-8 w-8"
          onChange={(e) => toggle()}
          type="checkbox"
          checked={isCompleted ? true : false}
        />
        <FaCheck className="cursor-pointer absolute hidden peer-checked:block" />
      </div>
      <FaTrash
        className="text-red-400 hover:text-red-500 cursor-pointer mr-2"
        size={33}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
      />
    </div>
  );
}

export default Todo;
