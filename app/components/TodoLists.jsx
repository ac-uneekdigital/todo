"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, Suspense } from "react";

function TodoLists() {
  const supabase = createClientComponentClient();
  const [todoLists, setTodoLists] = useState([]);
  const [fetchedLists, setfetchedLists] = useState(false);

  async function fetchLists() {
    const { data: lists, error } = await supabase
      .from("lists")
      .select()
      .order("id", { ascending: false });
    setTodoLists(lists);
    setfetchedLists(true);
    if (error) {
      console.log(error);
    }
  }

  console.log(todoLists);

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div>
      <div className="h-[70px] p-3">
        <h1 className="text-4xl text-white font-black">Todo&apos;s</h1>
      </div>
      <div className="flex justify-center px-2">
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
                className="flex items-center h-12 w-full p-2 text-white cursor-pointer hover:bg-indigo-700 rounded-lg"
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
