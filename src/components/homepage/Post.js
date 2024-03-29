import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { SITE, socket } from '../../App';
import CommentPostInHome from './CommentPostInHome';
import FeedPhoto from './modal/FeedPhoto';




export default function Post() {
  const [posts, setPosts] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })

  function returnDate(datePost) {
    const dateString = datePost;
    const timestamp = new Date(dateString).getTime();
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

  const loadMorePosts = async () => {
    try {
      const response = await axios.get(`${SITE}/posts`, {
        params: {
          // userId: '64e2edcbccb40a13972580bf', //! thay bằng id của user hiện tại
          after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      const newPosts = response.data.posts;
      const newEndCursor = response.data.endCursor;
      setPosts([...posts, ...newPosts]);
      if (newEndCursor) {
        setEndCursor(newEndCursor);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const loadPosts = async () => { //! load post lúc đầu
    try {
      const response = await axios.get(`${SITE}/posts`, {
        params: {
          // userId: '64e2edcbccb40a13972580bf', //! thay bằng id của user hiện tại
          after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      const newPosts = response.data.posts;
      const newEndCursor = response.data.endCursor;
      setPosts(newPosts);

      if (newEndCursor) {
        setEndCursor(newEndCursor);
      }
    } catch (error) {
      console.error(error);
    }
  };

  socket.on('comment', (commentS) => {
    // setComments(commentS)
  });
  socket.on('like', (postS) => {
    const updatedPostsS = posts.map(post => {
      if (post._id === postS._id) {
        return postS; // Thay thế bài post cần thay thế
      }
      return post; // Giữ nguyên bài post khác
    });
    setPosts(updatedPostsS)
  });
  const handleLike = (p, event) => {
    console.log(posts);
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




  useEffect(() => {
    loadPosts();


  }, []);

  useEffect(() => {
    const handleScroll = () => {

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMorePosts();
        console.log("scroll");
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts]); // Empty dependency array to run only once

 
  return (
    <>
      {/* Main content START */}
      <div className="col-md-8 col-lg-6 vstack gap-4">

        {/* Share feed START */}
        <div className="card card-body">
          <div className="d-flex mb-3">
            {/* Avatar */}
            <div className="avatar avatar-xs me-2">
              <a href="#"> <img className="avatar-img rounded-circle" src={user.avatarUrl} alt /> </a>
            </div>
            {/* Post input */}
            <form className="w-100">
              <textarea className="form-control pe-4 border-0" rows={2} data-autoresize placeholder="Share your thoughts..." defaultValue={""} />
            </form>
          </div>
          {/* Share feed toolbar START */}
          <ul className="nav nav-pills nav-stack small fw-normal">
            <li className="nav-item">
              <a className="nav-link bg-light py-1 px-2 mb-0" href="#!" data-bs-toggle="modal" data-bs-target="#feedActionPhoto"> <i className="bi bi-image-fill text-success pe-2" />Photo</a>
            </li>

            <li className="nav-item dropdown ms-lg-auto">
              <a className="nav-link bg-light py-1 px-2 mb-0" href="#" id="feedActionShare" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-three-dots" />
              </a>
              {/* Dropdown menu */}
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="feedActionShare">
                <li><a className="dropdown-item" href="#"> <i className="bi bi-envelope fa-fw pe-2" />Create a poll</a></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-bookmark-check fa-fw pe-2" />Ask a question </a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#"> <i className="bi bi-pencil-square fa-fw pe-2" />Help</a></li>
              </ul>
            </li>
          </ul>
          {/* Share feed toolbar END */}
        </div>
        {/* Share feed END */}
        {/* Card feed item START */}
        {posts.map(post => <div key={post._id} className="card">
          {/* Card header START */}
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
                    <h6 className="nav-item card-title mb-0">
                      <Link to={`/user/${post.ownerPost._id}`}>{post.ownerPost.fullName}</Link>
                      {/* <a href="#!"> {post.ownerPost.fullName} </a> */}
                    </h6>
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
                  <li><a className="dropdown-item" href="#" id='editButton'
                     > <i className="bi bi-bookmark fa-fw pe-2" />Edit post</a>
                    


                  </li>
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
          <div className="card-body">
            {/* Lông vào thẻ a để hiện modal  */}
            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={`#modalPost-${post._id}`}>

              {!post.content ? null :
                <p>{post.content}</p>
              }
              {/* Card img */}
              {!post.contentImage ? null :
                <img className="card-img" src={post.contentImage} alt="Post" />
              }
            </a>

            {/* Feed react START */}
            <ul className="nav nav-stack py-3 small">
              <li className="nav-item" style={{display: 'flex' , alignItems: 'center'}}>



                {post.like.some(obj => obj.idUser == user._id) ? <>
                  <a style={{marginRight: 4}} className="nav-link active" href="#!" onClick={(e) => {
                    handleLike(post._id, e)
                  }}> <i className="bi bi-hand-thumbs-up-fill pe-1" />
                    Liked
                  </a>

                </>
                  :
                  <><a style={{marginRight: 4}} className="nav-link" href="#!" onClick={(e) => {
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
             
              {/* Card share action END */}
            </ul>
            {/* Feed react END */}

            {/* Comment wrap START */}
            <CommentPostInHome postId={post._id} />
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
          {/* Card footer END */}

          {/* Modal post */}
          <div className="modal fade " id={`modalPost-${post._id}`} tabIndex={-1} aria-labelledby="modalLabelCreateFeed" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                {/* Modal feed header START */}
                <div className="modal-header">
                  <h5 className="modal-title" id="modalLabelCreateFeed">{post.ownerPost.fullName}'s Post</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
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

                  {!post.contentImage ? null :
                    <img className="card-img" src="assets/images/post/3by2/01.jpg" alt="Post" />
                  }


                  {/* Feed react START */}
                  <ul className="nav nav-stack py-3 small">
                    <li className="nav-item" style={{display: 'flex' , alignItems: 'center'}}>



                      {post.like.some(obj => obj.idUser == user._id) ? <>
                        <a style={{marginRight: 4}} className="nav-link active" href="#!" onClick={(e) => {
                          handleLike(post._id, e)
                        }}> <i className="bi bi-hand-thumbs-up-fill pe-1" />
                          Liked
                        </a>

                      </>
                        :
                        <><a style={{marginRight: 4}} className="nav-link" href="#!" onClick={(e) => {
                          handleLike(post._id, e)
                        }}> <i className="bi bi-hand-thumbs-up-fill pe-1" />
                          Like
                        </a></>}

                      ({post.like.length})

                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#!"> <i className="bi bi-chat-fill pe-1" />Comments (12)</a>
                    </li>
                    
                  </ul>
                  {/* Feed react END */}
                  {/* Add comment */}
                  <CommentPostInHome postId={post._id} />
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
          {/* Modal post end */}
        </div>)}
        {/* Card feed item END */}
        {/* Modal create Feed photo START */}
        <FeedPhoto posts={posts} setPosts={setPosts} />
        {/* Modal create Feed photo END */}


      </div>
      {/* Main content END */}
    </>
  )
}
