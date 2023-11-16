"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

//icons
import { FaTrash } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { TbEditOff } from "react-icons/tb";
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

  function toggleEdit() {
    setEditMode(!editMode);
  }

  const editTodo = async (todo) => {
    const supabase = createClientComponentClient();
    try {
      await supabase
        .from("todos")
        .update({ task: updatedTask })
        .eq("id", todo.id)
        .throwOnError()
        .select()
        .single();
      setEditMode(false);
      const editedTodo = {
        user_id: todo.user_id,
        id: todo.id,
        task: updatedTask,
        due_date: todo.due_date,
        is_complete: todo.is_complete,
        inserted_at: todo.inserted_at,
      };
      onEdit(editedTodo);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row gap-4 items-center rounded-md text-grey bg-white dark:bg-slate-900 h-auto lg:h-20 w-full p-1 border-2 border-gray-900 shadow-md">
      {editMode ? (
        <form>
          <input
            className="h-12 border-b-2 w-auto lg:w-[400px] border-gray-200 text-black dark:bg-slate-900 dark:text-white focus:outline-none indent-2 focus:border-gray-900 dark:focus:border-slate-400 text-base lg:text-xl "
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
        <div className="flex text-start flex-col">
          <p className="text-xs lg:text-xl indent-2">{todo.task}</p>
          <p className="text-xs lg:text-xl indent-2">Due:{todo.due_date}</p>
        </div>
      )}
      <div className="flex items-center gap-5 lg:ml-auto justify-between">
        {!editMode ? (
          <TbEdit
            className="text-gray-900 hover:text-gray-500 cursor-pointer ml-auto"
            size={36}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleEdit();
            }}
          />
        ) : (
          <TbEditOff
            className="text-gray-900 hover:text-gray-500 cursor-pointer ml-auto"
            size={36}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleEdit();
            }}
          />
        )}
        <div className="flex justify-center items-center">
          <input
            className="appearance-none rounded-full peer cursor-pointer bg-gray-200 hover:bg-lime-200 checked:bg-lime-400 h-8 w-8"
            onChange={(e) => toggle()}
            type="checkbox"
            checked={isCompleted ? true : false}
          />
          <FaCheck className="absolute stroke-white fill-white hidden peer-checked:block" />
        </div>
        <FaTrash
          className="text-rose-400 hover:text-rose-500 cursor-pointer mr-2"
          size={28}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(todo.id);
          }}
        />
      </div>
    </div>
  );
}

export default Todo;

{
  /* <form>
<input
  className="h-12 border-b-2 w-auto lg:w-[400px] border-gray-200 text-black dark:bg-slate-900 dark:text-white focus:outline-none indent-2 focus:border-gray-900 dark:focus:border-slate-400 text-base lg:text-xl "
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
</form> */
}
