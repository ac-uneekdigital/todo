"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

function UpdateTodo(props) {
  const [isComplete, setIsComplete] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setIsComplete((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <form>
      <input
        type="checkbox"
        name="is_complete"
        value={isComplete}
        checked={props.todo.is_complete}
        className="h-12 w-12 rounded-full accent-indigo-400 text-indigo-600"
        onChange={handleChange}
      ></input>
    </form>
  );
}

export default UpdateTodo;
