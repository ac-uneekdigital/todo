"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, Suspense } from "react";

function TodoLists({ authUser }) {
  const supabase = createClientComponentClient();
  const [todoLists, setTodoLists] = useState([]);
  const [fetchedLists, setfetchedLists] = useState(false);
  const [currentList, setCurrentList] = useState("");
  const [listName, setListName] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function fetchLists() {
    const { data: lists, error } = await supabase
      .from("lists")
      .select()
      .order("id", { ascending: false });
    setTodoLists(lists);
    setCurrentList(lists[0].id);
    setfetchedLists(true);
    if (error) {
      console.log(error);
    }
  }

  function handleFormState() {
    setShowForm(!showForm);
  }

  async function addNewList(authUser) {
    e.preventDefault();
    e.stopPropagation();
    const id = uuidv4();
    const { error } = await supabase.from("lists").insert({
      id: id,
      user_id: authUser.id,
      list_name: listName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    if (!error) {
      const newList = [
        {
          user_id: authUser.id,
          id: id,
          list_name: listName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        ...todoLists,
      ];
      setTodoLists(newList);
      setListName("");
    } else {
      console.error("Error when adding your todo", error);
    }
  }

  function selectedList(list) {
    setCurrentList(list.id);
  }

  console.log(currentList);

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div>
      <div className="h-[70px] p-3">
        <h1 className="text-4xl text-black font-black">Todo&apos;s</h1>
      </div>
      <div className="flex flex-col items-center px-2">
        <button
          onClick={handleFormState}
          className="h-12 w-full rounded-lg text-white bg-gray-900 hover:bg-gray-700 p-1 my-2"
        >
          Create New List
        </button>
        {showForm && (
          <form>
            <input
              type="text"
              onChange={(e) => setListName(e.target.value)}
              value={listName}
            ></input>
            <button onClick={addNewList}>Add List</button>
          </form>
        )}
        <Suspense fallback={<p>Loading todos...</p>}>
          {!fetchedLists && <p>Loading todo lists...</p>}{" "}
        </Suspense>
        {fetchedLists && todoLists.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <p>Looks like you&apos;ve got no lists...</p>
          </div>
        )}
        {todoLists.length > 0 &&
          todoLists.map((list) => {
            return (
              <div
                key={list.id}
                className={`${
                  currentList == list.id
                    ? "flex items-center h-12 w-full p-2 text-white {currentList === list.id && (bg-red-400)} hover:text-white cursor-pointer bg-gray-900 hover:bg-gray-700 rounded-lg"
                    : "flex items-center h-12 w-full p-2 text-grey {currentList === list.id && (bg-red-400)} hover:text-white cursor-pointer bg-white hover:bg-gray-900 rounded-lg"
                } `}
                onClick={() => selectedList(list)}
              >
                <p>{list.list_name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TodoLists;
