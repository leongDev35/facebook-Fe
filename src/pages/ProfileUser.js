import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from '../components/homepage/NavBar';

import { useSelector } from "react-redux";
import { SITE , socket} from '../App';
import CommentPostInHome from '../components/homepage/CommentPostInHome';


export default function ProfileUser() {
  const friendId = useParams().idUser
  console.log(friendId);
  //! Tìm user theo id để hiển thị trang cá nhân theo mỗi user

  const [friend, setFriend] = useState();
  const [relationship, setRelationship] = useState("");

  const checkRelationship = async () => {
    try {
      const response = await axios.get(`${SITE}/users/checkStranger`, {
        params: {
          userId: user._id,
          userIdToCheck: friendId,
        },
      });
      console.log(response.data);
      setRelationship(response.data.message)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(relationship);
  const [posts, setPosts] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })
  console.log(user);

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
          userId: friendId, //! thay bằng id của user hiện tại
          pageId: friendId,
          after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      const newPosts = response.data.posts;
      const newEndCursor = response.data.endCursor;
      //! đang bị lỗi chỗ đổi user cho nhau, cần nghiên cứu lại setPosts
      setPosts([...posts, ...newPosts]);
      console.log(newEndCursor);
      if (newEndCursor) {
        setEndCursor(newEndCursor);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const loadPosts = async () => { //! hàm load posts ban đầu, 
    try {
      const response = await axios.get(`${SITE}/posts`, {
        params: {
          userId: friendId, //! thay bằng id của user hiện tại
          pageId: friendId,
          after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      const newPosts = response.data.posts;
      const newEndCursor = response.data.endCursor;
      //! đang bị lỗi chỗ đổi user cho nhau, cần nghiên cứu lại setPosts
      // setPosts([...posts, ...newPosts]);
      setPosts(newPosts);
      console.log(newEndCursor);
      if (newEndCursor) {
        setEndCursor(newEndCursor);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadFriendInfo = async () => {
    try {
      const response = await axios.get(`${SITE}/users/info/${friendId}`);
      console.log(response.data.user);
      setFriend(response.data.user)
    } catch (error) {
      console.log(error);
    }
  }
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




  async function handleSentFriendRequest(friendId) {
    try {

      await axios.post(`${SITE}/users/friend/request`, {

        idSender: user._id,
        idReceiver: friendId
        // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL

      });



    } catch (error) {
      console.log(error);
    }


  }


  useEffect(() => {
    console.log(123);
    setEndCursor(null) //! để load lại từ đầu
    setPosts([]) //! để load lại các post của user mới
    loadPosts();
    loadFriendInfo()
    checkRelationship()

  }, [friendId]);


  return (
    <>
      {/* =======================
    Header START */}
      <NavBar user={user}></NavBar>
      {/* =======================
    Header END */}
      <main>
        {/* Container START */}
        <div className="container">
          <div className="row g-4">
            {/* Main content START */}
            <div className="col-lg-8 vstack gap-4">
              {/* My profile START */}
              <div className="card">
                {/* Cover image */}
                <div className="h-200px rounded-top" style={{ backgroundImage: 'url(/assets/images/bg/05.jpg)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
                {/* Card body START */}
                <div className="card-body py-0">
                  <div className="d-sm-flex align-items-start text-center text-sm-start">
                    {friend ? <> <div>
                      {/* Avatar */}
                      <div className="avatar avatar-xxl mt-n5 mb-3">

                        <img className="avatar-img rounded-circle border border-white border-3" src={friend.avatarUrl} alt />
                      </div>
                    </div>
                      <div className="ms-sm-4 mt-sm-3">
                        {/* Info */}
                        <h1 className="mb-0 h5">{friend.fullName}  <i className="bi bi-patch-check-fill text-success small" /></h1>


                        <p>{friend.listFriends.length} Connections</p>
                      </div> </> : null}


                    {/* Button */}
                    <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                      {friend ? (friend._id != user._id) ? relationship ?

                        (relationship == "Friend") ? <button onClick={() => {
                          
                        }} class="btn btn-danger-soft me-2" type="button"> <i class="bi bi-pencil-fill pe-1"></i> Friends </button> :
                          (relationship == "SentFriendRequest") ? <button onClick={() => {

                          }} class="btn btn-danger-soft me-2" type="button"> <i class="bi bi-pencil-fill pe-1"></i> Đã gửi lời mời kết bạn </button> :
                            (relationship == "FriendsSentRequest") ? <button onClick={() => {
                              
                            }} class="btn btn-danger-soft me-2" type="button"> <i class="bi bi-pencil-fill pe-1"></i> Trả lời lời mời kết bạn </button> :
                              (relationship == "Stranger") ? <button onClick={() => {
                                handleSentFriendRequest(friend._id);
                              }} class="btn btn-danger-soft me-2" type="button"> <i class="bi bi-pencil-fill pe-1"></i> Add Friends </button> :
                                null : null : null: null}

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

                </div>
                {/* Card body END */}

              </div>
              {/* My profile END */}

              {/* Card feed item START */}
              {posts.map(post => <div className="card">
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
                            <Link to={`/${post.ownerPost._id}`}>{post.ownerPost.fullName}</Link>


                          </h6>
                          <span className="nav-item small"> {returnDate(post.date)}</span>
                        </div>
                        <p className="mb-0 small">Web Developer at Webestica</p>
                      </div>
                    </div>
                    {/* Card feed action dropdown START */}
                    <div className="dropdown">
                      <a href="#" className="text-secondary btn btn-secondary-soft-hover py-1 px-2" id="cardFeedAction1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-three-dots" />
                      </a>
                      {/* Card feed action dropdown menu */}
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction1">
                        <li><a className="dropdown-item" href="#"> <i className="bi bi-bookmark fa-fw pe-2" />Save post</a></li>
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
                  <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={`#modalPost-${post._id}`}>
                    <p>{post.content}</p>
                    {/* Card img */}
                    <img className="card-img" src="/assets/images/post/3by2/01.jpg" alt="Post" />
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

                      ({post.like.length}) </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#!"> <i className="bi bi-chat-fill pe-1" />Comments (12)</a>
                    </li>
                    {/* Card share action START */}
                    <li className="nav-item dropdown ms-sm-auto">
                      <a className="nav-link mb-0" href="#" id="cardShareAction8" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-reply-fill flip-horizontal ps-1" />Share ({post.share})
                      </a>
                      {/* Card share action dropdown menu */}
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardShareAction8">
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
                        {/* Add comment */}
                        <div className="d-flex mb-3">
                          {/* Avatar */}
                          <div className="avatar avatar-xs me-2">
                            <a href="#!"> <img className="avatar-img rounded-circle" src="/assets/images/avatar/12.jpg" alt /> </a>
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
                                <a href="#!"><img className="avatar-img rounded-circle" src="/assets/images/avatar/05.jpg" alt /></a>
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
                                    <a href="#!"><img className="avatar-img rounded-circle" src="/assets/images/avatar/06.jpg" alt /></a>
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
                                    <a href="#!"><img className="avatar-img rounded-circle" src="/assets/images/avatar/07.jpg" alt /></a>
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
                                <a href="#!"><img className="avatar-img rounded-circle" src="/assets/images/avatar/05.jpg" alt /></a>
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

              {/* Card feed item END */}
            </div>
            {/* Main content END */}
            {/* Right sidebar START */}
            <div className="col-lg-4">
              <div className="row g-4">
                {/* Card START */}
                <div className="col-md-6 col-lg-12">
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
                <div className="col-md-6 col-lg-12">
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
                          <a href="/assets/images/albums/01.jpg" data-gallery="image-popup" data-glightbox>
                            <img className="rounded img-fluid" src="/assets/images/albums/01.jpg" alt />
                          </a>
                        </div>
                        {/* Photos item */}
                        <div className="col-6">
                          <a href="/assets/images/albums/02.jpg" data-gallery="image-popup" data-glightbox>
                            <img className="rounded img-fluid" src="/assets/images/albums/02.jpg" alt />
                          </a>
                        </div>
                        {/* Photos item */}
                        <div className="col-4">
                          <a href="/assets/images/albums/03.jpg" data-gallery="image-popup" data-glightbox>
                            <img className="rounded img-fluid" src="/assets/images/albums/03.jpg" alt />
                          </a>
                        </div>
                        {/* Photos item */}
                        <div className="col-4">
                          <a href="/assets/images/albums/04.jpg" data-gallery="image-popup" data-glightbox>
                            <img className="rounded img-fluid" src="/assets/images/albums/04.jpg" alt />
                          </a>
                        </div>
                        {/* Photos item */}
                        <div className="col-4">
                          <a href="/assets/images/albums/05.jpg" data-gallery="image-popup" data-glightbox>
                            <img className="rounded img-fluid" src="/assets/images/albums/05.jpg" alt />
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
    </>
  )
}
