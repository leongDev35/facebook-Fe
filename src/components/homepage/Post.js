import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useSelector } from "react-redux";
import { socket } from '../../App';
import CommentPostInHome from './CommentPostInHome';



export default function Post() {
  const [posts, setPosts] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })
  console.log(user);

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
  
  console.log(posts);
  const loadMorePosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/posts`, {
        params: {
          // userId: '64e2edcbccb40a13972580bf', //! thay bằng id của user hiện tại
          after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      const newPosts = response.data.posts;
      const newEndCursor = response.data.endCursor;
      setPosts([...posts, ...newPosts]);
      console.log(newEndCursor);
      if (newEndCursor) {
        setEndCursor(newEndCursor);
      }
    } catch (error) {
      console.error(error);
    }
  };
  socket.on('comment', (commentS) => {
    console.log(commentS);
    // setComments(commentS)
  });
  socket.on('like', (postS) => {
    const updatedPostsS = posts.map(post => {
      if (post._id === postS._id) {
        return postS; // Thay thế bài post cần thay thế
      }
      return post; // Giữ nguyên bài post khác
    });
    console.log(updatedPostsS);
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
    loadMorePosts();


  }, []);




  return (
    <>
      {/* Main content START */}
      <div className="col-md-8 col-lg-6 vstack gap-4">

        {/* Share feed START */}
        <div className="card card-body">
          <div className="d-flex mb-3">
            {/* Avatar */}
            <div className="avatar avatar-xs me-2">
              <a href="#"> <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt /> </a>
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
            <li className="nav-item">
              <a className="nav-link bg-light py-1 px-2 mb-0" href="#!" data-bs-toggle="modal" data-bs-target="#feedActionVideo"> <i className="bi bi-camera-reels-fill text-info pe-2" />Video</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link bg-light py-1 px-2 mb-0" data-bs-toggle="modal" data-bs-target="#modalCreateEvents"> <i className="bi bi-calendar2-event-fill text-danger pe-2" />Event </a>
            </li>
            <li className="nav-item">
              <a className="nav-link bg-light py-1 px-2 mb-0" href="#!" data-bs-toggle="modal" data-bs-target="#modalCreateFeed"> <i className="bi bi-emoji-smile-fill text-warning pe-2" />Feeling /Activity</a>
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
          <div className="card-body">
            {/* Lông vào thẻ a để hiện modal  */}
            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={`#modalPost-${post._id}`}>
              <p>{post.content}</p>
              {/* Card img */}
              <img className="card-img" src="assets/images/post/3by2/01.jpg" alt="Post" />
            </a>

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
                  <img className="card-img" src="assets/images/post/3by2/01.jpg" alt="Post" />


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
                  {/* Add comment */}
                  <div className="d-flex mb-3">
                    {/* Avatar */}
                    <div className="avatar avatar-xs me-2">
                      <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/avatar/12.jpg" alt /> </a>
                    </div>
                    {/* Comment box  */}
                    <form className="w-100">
                      <textarea data-autoresize className="form-control pe-4 bg-light" rows={1} placeholder="Add a comment..." defaultValue={""} />
                    </form>
                  </div>
                  {/* Comment wrap START */}
                  <ul className="comment-wrap list-unstyled">
                    {/* Comment item START */}
                    <li className="comment-item">
                      <div className="d-flex position-relative">
                        {/* Avatar */}
                        <div className="avatar avatar-xs">
                          <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt /></a>
                        </div>
                        <div className="ms-2">
                          {/* Comment by */}
                          <div className="bg-light rounded-start-top-0 p-3 rounded">
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-1"> <a href="#!"> Frances Guerrero </a></h6>
                              <small className="ms-2">5hr</small>
                            </div>
                            <p className="small mb-0">Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.</p>
                          </div>
                          {/* Comment react */}
                          <ul className="nav nav-divider py-2 small">
                            <li className="nav-item">
                              <a className="nav-link" href="#!"> Like (3)</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#!"> Reply</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#!"> View 5 replies</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* Comment item nested START */}
                      <ul className="comment-item-nested list-unstyled">
                        {/* Comment item START */}
                        <li className="comment-item">
                          <div className="d-flex">
                            {/* Avatar */}
                            <div className="avatar avatar-xs">
                              <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/06.jpg" alt /></a>
                            </div>
                            {/* Comment by */}
                            <div className="ms-2">
                              <div className="bg-light p-3 rounded">
                                <div className="d-flex justify-content-between">
                                  <h6 className="mb-1"> <a href="#!"> Lori Stevens </a> </h6>
                                  <small className="ms-2">2hr</small>
                                </div>
                                <p className="small mb-0">See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive.</p>
                              </div>
                              {/* Comment react */}
                              <ul className="nav nav-divider py-2 small">
                                <li className="nav-item">
                                  <a className="nav-link" href="#!"> Like (5)</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="#!"> Reply</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        {/* Comment item END */}
                        {/* Comment item START */}
                        <li className="comment-item">
                          <div className="d-flex">
                            {/* Avatar */}
                            <div className="avatar avatar-story avatar-xs">
                              <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/07.jpg" alt /></a>
                            </div>
                            {/* Comment by */}
                            <div className="ms-2">
                              <div className="bg-light p-3 rounded">
                                <div className="d-flex justify-content-between">
                                  <h6 className="mb-1"> <a href="#!"> Billy Vasquez </a> </h6>
                                  <small className="ms-2">15min</small>
                                </div>
                                <p className="small mb-0">Wishing calling is warrant settled was lucky.</p>
                              </div>
                              {/* Comment react */}
                              <ul className="nav nav-divider py-2 small">
                                <li className="nav-item">
                                  <a className="nav-link" href="#!"> Like</a>
                                </li>
                                <li className="nav-item">
                                  <a className="nav-link" href="#!"> Reply</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        {/* Comment item END */}
                      </ul>
                      {/* Load more replies */}
                      <a href="#!" role="button" className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center mb-3 ms-5" data-bs-toggle="button" aria-pressed="true">
                        <div className="spinner-dots me-2">
                          <span className="spinner-dot" />
                          <span className="spinner-dot" />
                          <span className="spinner-dot" />
                        </div>
                        Load more replies
                      </a>
                      {/* Comment item nested END */}
                    </li>
                    {/* Comment item END */}
                    {/* Comment item START */}
                    <li className="comment-item">
                      <div className="d-flex">
                        {/* Avatar */}
                        <div className="avatar avatar-xs">
                          <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt /></a>
                        </div>
                        {/* Comment by */}
                        <div className="ms-2">
                          <div className="bg-light p-3 rounded">
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-1"> <a href="#!"> Frances Guerrero </a> </h6>
                              <small className="ms-2">4min</small>
                            </div>
                            <p className="small mb-0">Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.</p>
                          </div>
                          {/* Comment react */}
                          <ul className="nav nav-divider pt-2 small">
                            <li className="nav-item">
                              <a className="nav-link" href="#!"> Like (1)</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#!"> Reply</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#!"> View 6 replies</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    {/* Comment item END */}
                  </ul>
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


        {/* Load more button START */}
        <a onClick={loadMorePosts} role="button" className="btn btn-loader btn-primary-soft" data-bs-toggle="button" aria-pressed="true">
          <span className="load-text" > Load more </span>
          <div className="load-icon">
            <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </a>
        {/* Load more button END */}
      </div>
      {/* Main content END */}
    </>
  )
}