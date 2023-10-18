import React from 'react'
import NavBar from '../components/homepage/NavBar'
import SideBar from '../components/homepage/SideBar'
import Post from '../components/homepage/Post'
import RightSideBar from '../components/homepage/RightSideBar'
import ModalFeed from '../components/homepage/modal/ModalFeed'
import FeedPhoto from '../components/homepage/modal/FeedPhoto'
import FeetVideo from '../components/homepage/modal/FeetVideo'
import EventModal from '../components/homepage/modal/EventModal'
import { useSelector } from "react-redux";
// import { socket } from '../App'



export default function HomePage() {

  const user = useSelector(({ users }) => {
    return users.currentUser.userData

  })


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
        <Post />
        {/* Right sidebar START */}
        <RightSideBar/>
        {/* Right sidebar END */}
      </div> {/* Row END */}
    </div>
    {/* Container END */}
  </main>
  {/* **************** MAIN CONTENT END **************** */}
  
  {/* Modal create Feed START */}
  <ModalFeed/>
  {/* Modal create feed END */}
  {/* Modal create Feed photo START */}
  {/* <FeedPhoto/> */}
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
