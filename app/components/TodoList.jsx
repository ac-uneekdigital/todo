"use client";
import UpdateTodo from "./UpdateTodo";

function TodoList({ todos, sortedTodos, authuser, user }) {
  return (
    <>
      {todos && (
        <div className="flex flex-col gap-2 justify-center p-2">
          {sortedTodos.map((todo) => (
            <div
              key={todo.id}
              className="relative flex justify-between items-center rounded-md bg-red-300 h-20 w-full p-1"
            >
              <p className="text-2xl">{todo.task}</p>
              <UpdateTodo todo={todo} />
            </div>
          ))}
        </div>
      )}
      {!todos && <p>nothing to see here</p>}
    </>
  );
}

export default TodoList;
