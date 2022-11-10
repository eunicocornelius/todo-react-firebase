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
import Loading from "./components/Loading";
import * as Realm from "realm-web";

// Instantiate MOngoDB Atlas Application
const app = new Realm.App({ id: "application-0-qymbc" });

function App() {
  const [todos, setTodos] = useState([]);
  const [notif, setNotif] = useState(false);
  const [loading, setLoading] = useState(true);

  //Declare MongoDB user and events variables
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);

  //Initialize MongoDB anonymous user login
  useEffect(() => {
    const login = async () => {
      //Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);

      //Connect to the MongoDB database
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("data").collection("changestream");

      //Every time change occurs in the system, add the event to list of events
      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
      }
    };
    login();
  }, []);

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
      setLoading(false);
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

  const handleNotifToggle = (toggle) => {
    setNotif(toggle);
  };

  return (
    <div className="App h-screen bg-slate-800">
      <div>
        <Title />
      </div>
      <div className="flex flex-col justify-center align-middle mx-2 md:mx-36 my-5 md:my-10 gap-5 md:text-xl text-center">
        <Notification notif={notif} />
        <AddTodo todos={todos} handleNotifToggle={handleNotifToggle} />
        <div>
          {loading ? (
            <Loading />
          ) : (
            todos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })
          )}
        </div>
        {user && (
          <div className="text-white">
            <h1>Connected as user ${user.id}</h1>
            <table>
              <thead>
                <tr>
                  <td>Operation</td>
                  <td>Document Key</td>
                  <td>Full Document</td>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={i}>
                    <td>{e.operationType}</td>
                    <td>{e.documentKey._id.toString()}</td>
                    <td>{JSON.stringify(e.fullDocument)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
