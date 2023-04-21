import { useState } from "react";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-services";
import ChatPage from "../ChatPage/ChatPage";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <h1>App</h1>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<ChatPage user={user} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
