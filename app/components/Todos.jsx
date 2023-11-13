"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, Suspense } from "react";

import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

//components
import Navbar from "./Navbar";
import Todo from "./Todo";
import Toast from "./Toast";

function TodoList({ authUser, user }) {
  const supabase = createClientComponentClient();
  const [fetchedData, setFetchedData] = useState(false);
  const [todos, setTodos] = useState([]);
  const [alertIsShown, setalertIsShown] = useState(false);
  const [searchState, setSearchState] = useState({
    query: "",
    list: [null],
  });
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [toast, setToast] = useState(null);

  async function fetchData() {
    const { data: todos, error } = await supabase
      .from("todos")
      .select()
      .order("id", { ascending: false });
    setTodos(todos);
    setFetchedData(true);
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
      due_date: dueDate,
      is_complete: false,
      inserted_at: new Date().toISOString(),
    });
    if (!error) {
      const newtodos = [
        {
          user_id: authUser.id,
          id: id,
          task: task,
          due_date: dueDate,
          is_complete: false,
          inserted_at: new Date().toISOString(),
        },
        ...todos,
      ];
      setTodos(newtodos);
      setTask("");
      setDueDate("");
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
    const editedTodos = todos.map((todo) => {
      return todo.id === editedTodo.id ? editedTodo : todo;
    });
    setTodos(editedTodos);
    setalertIsShown(true);
    setToast({
      type: "success",
      message: "Todo Updated!",
    });
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

  function handleErrors() {}

  return (
    <>
      <Navbar user={user} search={handleSearch} searchState={searchState} />
      <div className="flex h-[calc(100vh-70px)] justify-center items-center w-5/6 m-auto">
        <div className="flex flex-col justify-center w-1/2">
          <div className="flex flex-col w-fit bg-gray-200 p-2 rounded-lg shadow-lg">
            <h1 className="text-start text-xl font-black my-4">
              Create a Todo
            </h1>
            <form className="flex flex-col w-auto items-start gap-5 mb-4">
              <input
                className="h-12 rounded-md text-start lg:w-96 self-start border-2 border-indigo-500 indent-1 text-black dark:text-white"
                type="text"
                name="task"
                placeholder="Enter new task here..."
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "Enter new task here...")
                }
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                }}
              ></input>
              <input
                className="h-12 rounded-md text-start lg:w-96 self-start border-2 border-indigo-500 indent-1 text-black dark:text-white"
                type="date"
                name="date"
                placeholder="Select a due date..."
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Select a due date...")}
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
              ></input>
              <button
                onClick={handleAddTodo}
                className="bg-indigo-400 dark:bg-slate-900 hover:bg-indigo-300 hover:dark:bg-slate-700 text-white rounded-lg p-4"
              >
                ADD
              </button>
            </form>
          </div>
        </div>
        <div className="relative flex flex-col w-1/2 h-auto justify-center text-center rounded-lg p-1 bg-white dark:bg-slate-800">
          {/*Overscroll Container*/}
          <div className="flex h-auto max-h-[645px] overflow-y-auto overscroll-contain">
            <Suspense fallback={<p>Loading todos...</p>}>
              {!fetchedData && <p>Loading todos...</p>}
            </Suspense>
            {fetchedData && todos.length === 0 && (
              <div className="flex flex-col justify-center items-center">
                <p>Looks like you&apos;ve got nothing to do...</p>
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
              <div className="w-full h-full lg:mx-auto flex flex-col gap-2 items-center justify-center z-40 py-2">
                <h1 className="text-center text-2xl font-black my-4">
                  Your Todo&apos;s
                </h1>
                {searchState.query === ""
                  ? todos.map((todo) => {
                      return (
                        <Todo
                          key={todo.id}
                          todo={todo}
                          todos={todos}
                          onEdit={handleEdit}
                          onDelete={deleteTodo}
                          onError={handleErrors}
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
                          onError={handleErrors}
                        />
                      );
                    })}
              </div>
            )}
          </div>
          {searchState.list.length === 0 && searchState.query && (
            <p>Oops, we cant find anything like that.</p>
          )}
          <div className="h-12 w-full lg:w-1/6 absolute right-3 bottom-5 z-10">
            {toast && alertIsShown && <Toast toast={toast} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;

//todo add toast notifications
