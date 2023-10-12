import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { SITE, socket } from '../App';

import { useSelector } from 'react-redux';
import NavBar from '../components/homepage/NavBar';
import { Link } from 'react-router-dom';

export default function MyListRequest() {

  const [listFriendsSentRequest, setListFriendsSentRequest] = useState([]);

  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })

  async function handleResponseFriendRequest(friendId, response) {
    console.log(friendId);
    console.log(response);
    

    const updateListFriendsSentRequest = [...listFriendsSentRequest]
        const newArray = updateListFriendsSentRequest.filter((item) => item.userId._id !== friendId);
        console.log(newArray);
        setListFriendsSentRequest(newArray);
    console.log(friendId);
    const serverData = await axios.post(`${SITE}/users/friend/accept`, {
      
        userId: user._id, 
        senderId: friendId,
        response: response
        // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
      
    });
    console.log(serverData.data);
  }

  const loadListFriendsSentRequest = async () => {
    try {
      const response = await axios.get(`${SITE}/users/friend`, {
        params: {
          userId: user._id, //! thay bằng id của user hiện tại
          request: "listFriendsSentRequest"
          // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      console.log(response.data);
      const newListFriendsSentRequest = response.data.listFriendsSentRequest;
      setListFriendsSentRequest([...listFriendsSentRequest, ...newListFriendsSentRequest])

    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    loadListFriendsSentRequest();
  }, []);

  return (
    <div>
  {/* =======================
    Header START */}
  <NavBar user = {user}></NavBar>
  {/* =======================
    Header END */}
  {/* **************** MAIN CONTENT START **************** */}
  <main>
    {/* Container START */}
    <div className="container">
      <div className="row g-4">
        {/* Main content START */}
        <div className="col-lg-8 vstack gap-4">
          {/* Card START */}
          <div className="card">
            <div className="h-200px rounded-top" style={{backgroundImage: 'url(assets/images/bg/05.jpg)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} />
            {/* Card body START */}
            <div className="card-body py-0">
              <div className="d-sm-flex align-items-start text-center text-sm-start">
                <div>
                  {/* Avatar */}
                  <div className="avatar avatar-xxl mt-n5 mb-3">
                    <img className="avatar-img rounded-circle border border-white border-3" src={user.avatarUrl} alt />
                  </div>
                </div>
                <div className="ms-sm-4 mt-sm-3">
                  {/* Info */}
                  <h1 className="mb-0 h5">{user.fullName} <i className="bi bi-patch-check-fill text-success small" /></h1>
                  <p>250 connections</p>
                </div>
                {/* Button */}
                <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                  <button className="btn btn-danger-soft me-2" type="button"> <i className="bi bi-pencil-fill pe-1" /> Edit profile </button>
                  <div className="dropdown">
                    {/* Card share action menu */}
                    <button className="icon-md btn btn-light" type="button" id="profileAction2" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-three-dots" />
                    </button>
                    {/* Card share action dropdown menu */}
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileAction2">
                      <li><a className="dropdown-item" href="#"> <i className="bi bi-bookmark fa-fw pe-2" />Share profile in a message</a></li>
                      <li><a className="dropdown-item" href="#"> <i className="bi bi-file-earmark-pdf fa-fw pe-2" />Save your profile to PDF</a></li>
                      <li><a className="dropdown-item" href="#"> <i className="bi bi-lock fa-fw pe-2" />Lock profile</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item" href="#"> <i className="bi bi-gear fa-fw pe-2" />Profile settings</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* List profile */}
              <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                <li className="list-inline-item"><i className="bi bi-briefcase me-1" /> Lead Developer</li>
                <li className="list-inline-item"><i className="bi bi-geo-alt me-1" /> New Hampshire</li>
                <li className="list-inline-item"><i className="bi bi-calendar2-plus me-1" /> Joined on Nov 26, 2019</li>
              </ul>
            </div>
            {/* Card body END */}
            <div className="card-footer mt-3 pt-2 pb-0">
              {/* Nav profile pages */}
              <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                <li className="nav-item"> <Link className="nav-link" to="/mypost">My Post</Link> </li>
                <li className="nav-item"> <Link className="nav-link" to="/network">My Friend  </Link> </li>
                <li className="nav-item"> <Link className="nav-link active" to="/listRequest">My List Request <span className="badge bg-success bg-opacity-10 text-success small"> {listFriendsSentRequest.length}</span></Link> </li>
                <li className="nav-item"> <Link className="nav-link" to="/listStranger">My List Stranger</Link> </li>
              </ul>
            </div>
          </div>
          {/* Card END */}
          {/* Card Connections START */}
          <div className="card">
            {/* Card header START */}
            <div className="card-header border-0 pb-0">
              <h5 className="card-title"> List Request</h5> 
            </div>
            {/* Card header END */}
            {/* Card body START */}
            <div className="card-body">
              {/* Connections Item */}
              {listFriendsSentRequest.map(friend => 
                <div key={friend.userId._id} className="d-md-flex align-items-center mb-4">
                {/* Avatar */}
                <div className="avatar me-3 mb-3 mb-md-0">
                  <a href="#!"> <img className="avatar-img rounded-circle" src={friend.userId.avatarUrl} alt /> </a>
                </div>
                {/* Info */}
                <div className="w-100">
                  <div className="d-sm-flex align-items-start">
                    <h6 className="mb-0"><a href="#!">{friend.userId.fullName} </a></h6>
                    <p className="small ms-sm-2 mb-0">Full Stack Web Developer</p>
                  </div>
                  {/* Connections START */}
                  <ul className="avatar-group mt-1 list-unstyled align-items-sm-center">
                    <li className="avatar avatar-xxs">
                      <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" />
                    </li>
                    <li className="avatar avatar-xxs">
                      <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt="avatar" />
                    </li>
                    <li className="avatar avatar-xxs">
                      <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="avatar" />
                    </li>
                    <li className="avatar avatar-xxs">
                      <img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt="avatar" />
                    </li>
                    <li className="avatar avatar-xxs">
                      <div className="avatar-img rounded-circle bg-primary"><span className="smaller text-white position-absolute top-50 start-50 translate-middle">+2</span></div>
                    </li>
                    <li className="small ms-3">
                      Carolyn Ortiz, Frances Guerrero, and 20 other shared connections
                    </li>
                  </ul>
                  {/* Connections END */}
                </div>
                {/* Button */}
                <div className="ms-md-auto d-flex">
                  <button onClick={()=>{
                    handleResponseFriendRequest(friend.userId._id, "reject");
                  }} className="btn btn-danger-soft btn-sm mb-0 me-2"> Reject </button>
                  <button onClick={()=>{
                    handleResponseFriendRequest(friend.userId._id, "accept");
                  }} className="btn btn-primary-soft btn-sm mb-0"> Accept </button>
                </div>
              </div>
              )}
              
              
              <div className="d-grid">
                {/* Load more button START */}
                <a href="#!" role="button" className="btn btn-sm btn-loader btn-primary-soft" data-bs-toggle="button" aria-pressed="true">
                  <span className="load-text"> Load more connections </span>
                  <div className="load-icon">
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </a>
                {/* Load more button END */}
              </div>
            </div>
            {/* Card body END */}
          </div>
          {/* Card Connections END */}
        </div>
        {/* Main content END */}
        {/* Right sidebar START */}
        <div className="col-lg-4">
          <div className="row g-4">
            {/* Card START */}
            <div className="col-sm-6 col-lg-12">
              <div className="card">
                <div className="card-header border-0 pb-0">
                  <h5 className="card-title">About</h5>
                  {/* Button modal */}
                </div>
                {/* Card body START */}
                <div className="card-body position-relative pt-0">
                  <p>He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.</p>
                  {/* Date time */}
                  <ul className="list-unstyled mt-3 mb-0">
                    <li className="mb-2"> <i className="bi bi-calendar-date fa-fw pe-1" /> Born: <strong> October 20, 1990 </strong> </li>
                    <li className="mb-2"> <i className="bi bi-heart fa-fw pe-1" /> Status: <strong> Single </strong> </li>
                    <li> <i className="bi bi-envelope fa-fw pe-1" /> Email: <strong> webestica@gmail.com </strong> </li>
                  </ul>
                </div>
                {/* Card body END */}
              </div>
            </div>
            {/* Card END */}
            
            {/* Card START */}
            <div className="col-sm-6 col-lg-12">
              <div className="card">
                {/* Card header START */}
                <div className="card-header d-sm-flex justify-content-between border-0">
                  <h5 className="card-title">Photos</h5>
                  <a className="btn btn-primary-soft btn-sm" href="#!"> See all photo</a>
                </div>
                {/* Card header END */}
                {/* Card body START */}
                <div className="card-body position-relative pt-0">
                  <div className="row g-2">
                    {/* Photos item */}
                    <div className="col-6">
                      <a href="assets/images/albums/01.jpg" data-gallery="image-popup" data-glightbox>
                        <img className="rounded img-fluid" src="assets/images/albums/01.jpg" alt />
                      </a>
                    </div>
                    {/* Photos item */}
                    <div className="col-6">
                      <a href="assets/images/albums/02.jpg" data-gallery="image-popup" data-glightbox>
                        <img className="rounded img-fluid" src="assets/images/albums/02.jpg" alt />
                      </a>
                    </div>
                    {/* Photos item */}
                    <div className="col-4">
                      <a href="assets/images/albums/03.jpg" data-gallery="image-popup" data-glightbox>
                        <img className="rounded img-fluid" src="assets/images/albums/03.jpg" alt />
                      </a>
                    </div>
                    {/* Photos item */}
                    <div className="col-4">
                      <a href="assets/images/albums/04.jpg" data-gallery="image-popup" data-glightbox>
                        <img className="rounded img-fluid" src="assets/images/albums/04.jpg" alt />
                      </a>
                    </div>
                    {/* Photos item */}
                    <div className="col-4">
                      <a href="assets/images/albums/05.jpg" data-gallery="image-popup" data-glightbox>
                        <img className="rounded img-fluid" src="assets/images/albums/05.jpg" alt />
                      </a>
                      {/* glightbox Albums left bar END  */}
                    </div>
                  </div>
                </div>
                {/* Card body END */}
              </div>
            </div>
            {/* Card END */}
            
          </div>
        </div>
        {/* Right sidebar END */}
      </div> {/* Row END */}
    </div>
    {/* Container END */}
  </main>
</div>

  )
}
