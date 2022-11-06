import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({
  todo,
  toggleComplete,
  handleDelete,
  handleEdit,
}) {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    if (todo.complete === true) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className="flex justify-center align-middle rounded-md bg-gray-700 mb-3">
      <div className="basis-5/6">
        <input
          className="w-full px-4 md:px-5  py-2 rounded-md text-white bg-transparent outline-none"
          style={{ textDecoration: todo.completed && "line-through" }}
          type="text"
          value={todo.title === "" ? newTitle : todo.title}
          onChange={handleChange}
        />
      </div>
      <div className="basis-1/6 flex justify-end gap-1 md:gap-3 py-2 pr-4">
        <button
          className="max-w-fit max-h-fit content-center text-emerald-500 "
          onClick={() => toggleComplete(todo)}
        >
          <CheckCircleIcon id="i" />
        </button>
        <button
          className="max-w-fit max-h-fit content-center text-cyan-500"
          onClick={() => handleEdit(todo, newTitle)}
        >
          <EditIcon id="i" />
        </button>
        <button
          className="max-w-fit max-h-fit content-center text-red-500"
          onClick={() => handleDelete(todo)}
        >
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}
