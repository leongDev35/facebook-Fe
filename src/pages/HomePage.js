import React from 'react'
import NavBar from '../components/homepage/NavBar'
import SideBar from '../components/homepage/SideBar'
import Post from '../components/homepage/Post'
import RightSideBar from '../components/homepage/RightSideBar'
import Chat from '../components/homepage/Chat'
import ModalFeed from '../components/homepage/modal/ModalFeed'
import FeedPhoto from '../components/homepage/modal/FeedPhoto'
import FeetVideo from '../components/homepage/modal/FeetVideo'
import EventModal from '../components/homepage/modal/EventModal'
import { useSelector } from "react-redux";

export default function HomePage() {

  const user = useSelector(({ users }) => {
    return users.currentUser.userData

  })
  // const user = {
  //   avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/module5instagram-b1f91.appspot.com/o/BaseFiles%2Fdefaultuser.jpg?alt=media&token=b4932bc6-f626-4605-a2f5-99f0e79bcfda',
  //   fullName: 'Duy Nguyễn',
  //   bio: 'Tôi là test',

  // }
  const posts = [
    {
      owner: user,
      content: 'test content',
      like: 40,
      share: 35,
      status: 'public',
    },
    {
      owner: user,
      content: 'test content1',
      like: 40,
      share: 35,
      status: 'public',
    }
  ]



  return (
    <div>
  &lt;&gt;
    <NavBar user = {user} />
  {/* =======================

  {/* **************** MAIN CONTENT START **************** */}
  <main>
    {/* Container START */}
    <div className="container">
      <div className="row g-4">
        {/* Sidenav START */}
        <SideBar user = {user} />
        {/* Sidenav END */}
        <Post posts = {posts}/>
        {/* Right sidebar START */}
        <RightSideBar/>
        {/* Right sidebar END */}
      </div> {/* Row END */}
    </div>
    {/* Container END */}
  </main>
  {/* **************** MAIN CONTENT END **************** */}
  {/* Main Chat START */}
  <Chat/>
  {/* Main Chat END */}
  {/* Modal create Feed START */}
  <ModalFeed/>
  {/* Modal create feed END */}
  {/* Modal create Feed photo START */}
  <FeedPhoto/>
  {/* Modal create Feed photo END */}
  {/* Modal create Feed video START */}
  <FeetVideo/>
  {/* Modal create Feed video END */}
  {/* Modal create events START */}
  <EventModal/>
  {/* Modal create events END */}
  {/* =======================
JS libraries, plugins and custom scripts */}
  {/* Bootstrap JS */}
  {/* Vendors */}
  {/* Template Functions */}
</div>

  )
}
