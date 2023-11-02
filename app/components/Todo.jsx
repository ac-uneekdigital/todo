import React from "react";
import UpdateTodo from "./UpdateTodo";

export const Todo = ({ task, isComplete, instertedAt }) => {
  return (
    <div className="relative flex justify-between items-center rounded-md bg-red-300 h-20 w-full p-1">
      <p className="text-2xl">{task}</p>
    </div>
  );
};
