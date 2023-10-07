
import { Navigate, Route, Routes, } from "react-router-dom";
import Login from './pages/Login';
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import MyNetwork from "./pages/MyNetwork";
import Message from "./pages/Message";
import CreateGroup from "./pages/CreateGroup";
import { useSelector } from "react-redux";

import io from 'socket.io-client';
export const socket = io('http://localhost:3001');
socket.onAny((event, ...args) => {  //! 1 trình nghe tổng hợp, mọi listener mà client nhận được sẽ hiện
  console.log(event, args);
});
function App() {
  const user = useSelector(({ users }) => {
    return users.currentUser

  })
  return (
    <Routes>
      <Route path="/register" element={<Register />} />

      {user ?
        <>
          <Route path="*" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/network" element={<MyNetwork />} />
          <Route path="/message" element={<Message />} />
          <Route path="/createGroup" element={<CreateGroup />} />
        </>

        : <>
          <Route path={"*"} element={<Login/>} />
        </>
      }



    </Routes>
  );
}

export default App;
