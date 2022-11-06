import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTodo({ todos }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      if (!todos.some((todo) => todo.title === title)) {
        await addDoc(collection(db, "todos"), {
          title,
          completed: false,
        });
        setTitle("");
      } else {
        //TODO: insert already exist pop-up here
        console.log("todo has already exist");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-2 md:gap-5"
    >
      <div className="flex-grow basis-5/6">
        <input
          type="text"
          placeholder="Enter new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 md:px-5 py-2 rounded-md shadow-md text-white bg-slate-500"
        />
      </div>
      <div className="flex-grow basis-1/6">
        <button className="w-full font-bold text-center text-slate-300 bg-green-700 rounded-md px-2 md:px-5 py-2">
          Add
        </button>
      </div>
    </form>
  );
}
