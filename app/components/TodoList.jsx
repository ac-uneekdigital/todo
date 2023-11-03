"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

function TodoList({ authUser }) {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setfilteredTodos] = useState([]);
  const [searchText, setSearchText] = useState("");

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
  }, [todos]);

  return (
    <>
      <AddTodo authUser={authUser} />
      {todos && (
        <div className="w-full lg:w-1/2 lg:mx-auto flex flex-col gap-2 items-center justify-center py-2">
          <form>
            <input
              type="text"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = searchText)}
              onChange={(e) => {
                {
                  setSearchText(e.target.value);
                }
              }}
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              Search
            </button>
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
