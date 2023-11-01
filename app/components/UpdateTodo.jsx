"use client";

function UpdateTodo(props) {
  console.log(props);
  return (
    <form>
      <input
        type="checkbox"
        checked={props.todo.is_complete}
        className="h-12 w-12 rounded-full accent-indigo-400 text-indigo-600"
        onChecked={props.handleClick}
      ></input>
    </form>
  );
}

export default UpdateTodo;
