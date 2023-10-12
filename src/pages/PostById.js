import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import {SITE , socket} from '../App';
import NavBar from '../components/homepage/NavBar';
import CommentPostInHome from '../components/homepage/CommentPostInHome';
import axios from 'axios'

export default function PostById() {
    const user = useSelector(({ users }) => {
        return users.currentUser.userData
      })
  const postId = useParams().postId
    console.log(postId);
  const [post, setPost] = useState();
  const loadPost = async () => { //! hàm load posts ban đầu, 
    try {
      const response = await axios.get(`${SITE}/posts/info`, {
        params: {
            postId: postId, 
        },
      });
      const newPosts = response.data.post;
     
      setPost(newPosts);
      
    } catch (error) {
      console.error(error);
    }
  };
  console.log(post);

  useEffect(() => {
    setPost()
    loadPost();

  }, [postId]);
    function returnDate(datePost) {
        const dateString = datePost;
        const timestamp = new Date(dateString).getTime();
        console.log(timestamp); // Kết quả là một con số biểu thị ngày tháng
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
    
        const monthName = monthNames[month];
        return `${monthName} ${day} ${year} at ${hours}:${minutes}`
      }
      const handleLike = (p, event) => {
       
        //! phát sự kiện like đến server
        socket.emit('like', p, user._id);
        // Ngăn chặn mặc định hành vi của thẻ <a> (chuyển đến liên kết)
        event.preventDefault();
    
        // Lấy thẻ <a> mà bạn đã ấn
        const anchor = event.target;
    
        // Kiểm tra xem thẻ <a> có lớp 'active' không
        const isLiked = anchor.classList.contains('active');
    
        // Thay đổi màu chữ
        if (isLiked) {
          anchor.classList.remove('active');
        } else {
          anchor.classList.add('active');
        }
    
        // Thay đổi nội dung chữ
        anchor.textContent = isLiked ? 'Like' : 'Liked';
    
      };
    
  return (<>
  <div>{postId}</div>
  {/* =======================
    Header START */}
      <NavBar user={user}></NavBar>
      {/* =======================
    Header END */}

    {!post ? null :
    <div className="pt-5">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        {/* Modal feed header START */}
       
        {/* Modal feed header END */}
        {/* Modal feed body START */}
        <div className="card-header border-0 pb-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {/* Avatar */}
              <div className="avatar avatar-story me-2">
                <a href="#!"> <img className="avatar-img rounded-circle" src={post.ownerPost.avatarUrl} alt /> </a>
              </div>
              {/* Info */}
              <div>
                <div className="nav nav-divider">
                  <h6 className="nav-item card-title mb-0"> <a href="#!"> {post.ownerPost.fullName} </a></h6>
                </div>
                <p className="mb-0 small">{returnDate(post.date)}</p>
              </div>
            </div>
            {/* Card feed action dropdown START */}
            <div className="dropdown">
              <a href="#" className="text-secondary btn btn-secondary-soft-hover py-1 px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-three-dots" />
              </a>
              {/* Card feed action dropdown menu */}
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                <li><a className="dropdown-item" href="#" > <i className="bi bi-bookmark fa-fw pe-2" />Save post</a></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-person-x fa-fw pe-2" />Unfollow lori ferguson </a></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-x-circle fa-fw pe-2" />Hide post</a></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-slash-circle fa-fw pe-2" />Block</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-flag fa-fw pe-2" />Report post</a></li>
              </ul>
            </div>
            {/* Card feed action dropdown END */}
          </div>
        </div>
        {/* Card header END */}
        {/* Card body START */}
        <div className="card-body overflow-auto">
          {/* Lông vào thẻ a để hiện modal  */}

          <p>{post.content}</p>
          {/* Card img */}
          <img className="card-img" src="/assets/images/post/3by2/01.jpg" alt="Post" />


          {/* Feed react START */}
          <ul className="nav nav-stack py-3 small">
            <li className="nav-item">



              {post.like.some(obj => obj.idUser == user._id) ? <>
                <a className="nav-link active" href="#!" onClick={(e) => {
                  handleLike(post._id, e)
                }}> <i className="bi bi-hand-thumbs-up-fill pe-1" />
                  Liked
                </a>

              </>
                :
                <><a className="nav-link" href="#!" onClick={(e) => {
                  handleLike(post._id, e)
                }}> <i className="bi bi-hand-thumbs-up-fill pe-1" />
                  Like
                </a></>}

              ({post.like.length})

            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!"> <i className="bi bi-chat-fill pe-1" />Comments (12)</a>
            </li>
            {/* Card share action START */}
            <li className="nav-item dropdown ms-sm-auto">
              <a className="nav-link mb-0" href="#" id="cardShareAction" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-reply-fill flip-horizontal ps-1" />Share ({post.share})
              </a>
              {/* Card share action dropdown menu */}
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardShareAction">
                <li><a className="dropdown-item" href="#"> <i className="bi bi-envelope fa-fw pe-2" />Send via Direct Message</a></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-bookmark-check fa-fw pe-2" />Bookmark </a></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-link fa-fw pe-2" />Copy link to post</a></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-share fa-fw pe-2" />Share post via …</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-pencil-square fa-fw pe-2" />Share to News Feed</a></li>
              </ul>
            </li>
            {/* Card share action END */}
          </ul>
          {/* Feed react END */}
          
          {/* Comment wrap START */}
    <CommentPostInHome postId={postId} />
    {/* Comment wrap END */}
        </div>
        {/* Card body END */}
        {/* Card footer START */}
        <div className="card-footer border-0 pt-0">
          {/* Load more comments */}
          <a href="#!" role="button" className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center" data-bs-toggle="button" aria-pressed="true">
            <div className="spinner-dots me-2">
              <span className="spinner-dot" />
              <span className="spinner-dot" />
              <span className="spinner-dot" />
            </div>
            Load more comments
          </a>
        </div>

        {/* Modal feed footer */}
      </div>
    </div>
  </div>
    }
  
  </>
  )
}
