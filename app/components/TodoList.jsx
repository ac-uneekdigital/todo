"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Todo from "./Todo";

function TodoList({ authUser }) {
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);

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

  const editTodo = async (id) => {
    const supabase = createClientComponentClient();
    setEditMode(true);
    console.log(editMode);
    try {
      console.log("editing", id);
      //await supabase.from("todos").update().eq("id", id).throwOnError();
      //setTodos(todos.filter((x) => x.id != id));
      setEditMode(false);
      console.log(editMode);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [todos]);

  return (
    <>
      {todos && (
        <div className="flex flex-col gap-2 justify-center p-2">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
              edit={() => editTodo(todo.id)}
            />
          ))}
        </div>
      )}
      {!todos && <p>nothing to see here</p>}
    </>
  );
}

export default TodoList;
