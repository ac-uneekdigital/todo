"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

function TodoList({ authUser }) {
  const supabase = createClientComponentClient();
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [task, setTask] = useState("");

  async function fetchData() {
    const supabase = createClientComponentClient();
    const { data: todos, error } = await supabase
      .from("todos")
      .select()
      .order("id", { ascending: false });
    setTodos(todos);

    if (error) {
      console.log(error);
    }
  }

  async function handleAddTodo(e) {
    e.preventDefault();
    e.stopPropagation();
    const id = uuidv4();
    const { error } = await supabase.from("todos").insert({
      id: id,
      user_id: authUser.id,
      task: task,
      is_complete: false,
      inserted_at: new Date().toISOString(),
    });
    //console.log(data);
    const newtodos = [
      {
        user_id: authUser.id,
        id: id,
        task: task,
        is_complete: false,
        inserted_at: new Date().toISOString(),
      },
      ...todos,
    ];
    setTask("");
    setTodos(newtodos);
  }

  function handleSearch(e) {
    e.preventDefault();
    e.stopPropagation();
    const results = todos.filter((todo) => {
      if (e.target.value === "") return todo;
      return todo.task.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setTodos(results);
  }

  const deleteTodo = async (id) => {
    const supabase = createClientComponentClient();
    try {
      await supabase.from("todos").delete().eq("id", id).throwOnError();
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
          onClick={handleAddTodo}
          className="hidden bg-indigo-400 dark:bg-slate-900 hover:bg-indigo-300 hover:dark:bg-slate-700 text-white rounded-lg p-4"
        >
          ADD
        </button>
      </form>
      {todos && (
        <div className="w-full lg:w-1/2 lg:mx-auto flex flex-col gap-2 items-center justify-center py-2">
          <form>
            <input
              type="text"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = searchTerm)}
              onChange={(e) => {
                {
                  setSearchTerm(e.target.value);
                  handleSearch(e);
                }
              }}
            ></input>
          </form>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} onDelete={deleteTodo} />
          ))}
        </div>
      )}
      {!todos && <p>nothing to see here</p>}
    </>
  );
}

export default TodoList;
