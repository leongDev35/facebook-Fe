
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
import MyListRequest from "./pages/MyListRequesFriend";
import MyListStranger from "./pages/MyListStranger";
import MyPost from "./pages/MyPost";
import ProfileUser from "./pages/ProfileUser";
import PostById from "./pages/PostById";
import { useEffect, useState } from "react";

export const SITE = "http://localhost:3001"
export const SITEFE = "http://localhost:3000"

export const socket = io(SITE);
socket.onAny((event, ...args) => {  //! 1 trình nghe tổng hợp, mọi listener mà client nhận được sẽ hiện
  console.log(event, args);
});

function App() {

  const user = useSelector(({ users }) => {
    return users.currentUser

  })
  console.log(user);
  //! gửi id user đến server mỗi khi kết nối socket
  if(user != null) {
    socket.auth = { userId: user.userData._id };
    console.log(socket);
    socket.connect();
  } else {
    socket.disconnect();
  }
 


  return (
    <Routes>
      <Route path="/register" element={<Register />} />

      {user  ?
        <>
          <Route path="*" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mypost" element={<MyPost />} />
          <Route path="/network" element={<MyNetwork />} />
          <Route path="/listRequest" element={<MyListRequest />} />
          <Route path="/listStranger" element={<MyListStranger />} />
          <Route path="/message" element={<Message />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/user/:idUser" element={<ProfileUser />} />
          <Route path="/post/:postId" element={<PostById />} />

        </>

        : <>
          <Route path={"*"} element={<Login />} />
        </>
      }



    </Routes>
  );
}

export default App;
