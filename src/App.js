import "./App.css";
import React, { useEffect, useState } from "react";
import Title from "./components/Title";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Notification from "./components/Notification";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapsot) => {
      let todosArray = [];
      querySnapsot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      // Sort based on alphabetical order
      todosArray.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const handleDelete = async (todo) => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  return (
    <div className="App h-screen bg-slate-800">
      <div>
        <Title />
      </div>
      <div className="flex flex-col justify-center align-middle mx-2 md:mx-36 my-10 gap-5 md:text-xl text-center">
        <Notification />
        <AddTodo todos={todos} />
        <div>
          {todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
