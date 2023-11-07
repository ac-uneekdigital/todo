"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

//components
import Todo from "./Todo";
import Toast from "./Toast";

function TodoList({ authUser }) {
  const supabase = createClientComponentClient();
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [alertIsShown, setalertIsShown] = useState(false);
  const [searchState, setSearchState] = useState({
    query: "",
    list: [null],
  });
  const [task, setTask] = useState("");

  const [toast, setToast] = useState(null);

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
    if (!error) {
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
      setTodos(newtodos);
      setTask("");
      setalertIsShown(true);
      setToast({
        type: "success",
        message: "Todo Added!",
      });
    } else {
      console.error("Error when adding your todo", error);
    }
  }

  function handleEdit(editedTodo) {
    //console.log(editedTodo.id);
    const editedTodos = todos.map((todo) => {
      return todo.id === editedTodo.id ? editedTodo : todo;
    });
    console.log(editedTodos);
    setTodos(editedTodos);
  }

  function handleSearch(e) {
    e.preventDefault();
    e.stopPropagation();
    const results = todos.filter((todo) => {
      if (e.target.value === "") {
        return "";
      } else {
        return todo.task.toLowerCase().includes(e.target.value.toLowerCase());
      }
    });
    setSearchState({
      query: e.target.value,
      list: results,
    });
  }

  const deleteTodo = async (id) => {
    const supabase = createClientComponentClient();
    try {
      await supabase.from("todos").delete().eq("id", id).throwOnError();
      setTodos(todos.filter((x) => x.id != id));
      setalertIsShown(true);
      setToast({
        type: "success",
        message: "Todo Deleted!",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setalertIsShown(false);
      setToast(null);
    }, 2500);
  }, [toast]);

  return (
    <>
      <h1 className="text-center text-xl font-black my-4">Add ToDo</h1>
      <form className="flex flex-col items-center gap-5 w-full p-2 mb-4">
        <input
          className="h-12 rounded-md text-center w-full lg:w-1/2 self-center text-black dark:text-white"
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
      <div className="relative min-h-[600px] text-center rounded-lg bg-indigo-200 dark:bg-slate-800 m-5 p-3">
        <h1 className="text-center text-2xl font-black my-4">
          Your Todo&apos;s
        </h1>
        {todos.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <p>Cool, All your todos are complete.</p>
            <Image
              className="pt-8"
              src={"/happy.svg"}
              height={350}
              width={350}
              alt="completed todos image"
            />
          </div>
        )}
        {todos.length > 0 && (
          <div className="w-full lg:w-1/2 lg:mx-auto flex flex-col gap-2 items-center justify-center p-2 z-40">
            <form className="flex flex-col items-center gap-5 w-full pb-2">
              <input
                className="h-12 rounded-md text-center w-full self-center text-black  dark:text-white"
                type="text"
                placeholder="Filter your todos here..."
                value={searchState.query}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Filter your todos")}
                onChange={(e) => {
                  {
                    handleSearch(e);
                  }
                }}
              ></input>
            </form>
            {searchState.query === ""
              ? todos.map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      todos={todos}
                      onEdit={handleEdit}
                      onDelete={deleteTodo}
                    />
                  );
                })
              : searchState.list.map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      todos={todos}
                      onEdit={handleEdit}
                      onDelete={deleteTodo}
                    />
                  );
                })}
          </div>
        )}
        {searchState.list.length === 0 && searchState.query && (
          <p>Oops, we cant find anything like that.</p>
        )}
        <div className="h-12 w-full lg:w-1/6 absolute right-3 bottom-5 z-10">
          {toast && alertIsShown && <Toast toast={toast} />}
        </div>
      </div>
    </>
  );
}

export default TodoList;

//todo add toast notifications
