"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

//icons
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function Todo({ todo, onEdit, onDelete }) {
  const supabase = createClientComponentClient();
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);
  const [editMode, setEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);

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

  const editTodo = async (todo) => {
    const supabase = createClientComponentClient();
    try {
      //console.log(editMode);
      //console.log("editing", todo.id);
      await supabase
        .from("todos")
        .update({ task: updatedTask })
        .eq("id", todo.id)
        .throwOnError()
        .select()
        .single();
      setEditMode(false);
      //console.log(editMode);
      const editedTodo = {
        user_id: todo.user_id,
        id: todo.id,
        task: updatedTask,
        is_complete: todo.is_complete,
        inserted_at: todo.inserted_at,
      };
      onEdit(editedTodo);
      // console.log(editedTodo);
    } catch (error) {
      console.log("error", error);
    }
  };

  //todo setup a toggle for edit mode which allows for it to be cancelled. also chnage the icon to a cross when editmode is active..

  return (
    <div className="relative flex gap-4 items-center rounded-md text-white bg-indigo-500 dark:bg-slate-900 h-20 w-full p-1">
      {editMode ? (
        <form>
          <input
            className="h-12 border-b-2 border-gray-200 text-black bg-indigo-500 dark:bg-slate-900 dark:text-white focus:outline-none indent-2 focus:border-orange-400"
            type="text"
            value={updatedTask}
            onFocus={(e) => (e.target.placeholder = updatedTask)}
            onBlur={(e) => (e.target.placeholder = updatedTask)}
            onChange={(e) => setUpdatedTask(e.target.value)}
          ></input>
          <button
            className="hidden"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editTodo(todo);
            }}
          >
            Update
          </button>
        </form>
      ) : (
        <p className="text-2xl">{todo.task}</p>
      )}
      <FaEdit
        className="text-indigo-400 hover:text-indigo-300 cursor-pointer ml-auto"
        size={36}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditMode(true);
        }}
      />
      <div className="flex justify-center items-center">
        <input
          className="appearance-none rounded-full peer cursor-pointer bg-indigo-400 hover:bg-indigo-300 checked:bg-teal-300 h-8 w-8"
          onChange={(e) => toggle()}
          type="checkbox"
          checked={isCompleted ? true : false}
        />
        <FaCheck className="absolute hidden peer-checked:block" />
      </div>
      <FaTrash
        className="text-red-400 hover:text-red-500 cursor-pointer mr-2"
        size={28}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(todo.id);
        }}
      />
    </div>
  );
}

export default Todo;
