import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { socket } from '../App';

export default function Message() {
  const [type, setType] = useState('');
  const [partners, setPartnerss] = useState([]);
  const [message, setMessage] = useState();
  // const [endCursor, setEndCursor] = useState(null);
  console.log(message);
  console.log(partners);
  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })
  //! gửi id user đến server mỗi khi kết nối socket
  socket.auth = { userId: user._id };
  socket.connect();
  //! hàm trả về Giờ 
  function returnHour(dateMessage) {
    const dateString = dateMessage;
    const timestamp = new Date(dateString).getTime();
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`
  }

  const loadPartners = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/chat/listFriend`, {
        params: {
          userId: user._id, //! thay bằng id của user hiện tại
          // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      console.log(response.data);
      const newPartners = response.data;
      setPartnerss([...partners, ...newPartners])

    } catch (error) {
      console.log(error);
    }

  }

  //! Click tab socket 
  const clickTab = async (partnerId) => {
    //! Tập trung vào input ĐANG BỊ BUG KHI MÀ CHUYỂN TAB THÌ KHÔNG FOCUS 
    console.log(1);
    const inputElement = document.getElementById(`my-textarea-${partnerId}`);
    console.log(inputElement);
    if (inputElement) {
      inputElement.focus();

    }

    //! gửi id của lastMessage tại thời điểm click 
    socket.emit('clickTab', user._id, partnerId, socket.id)
    setMessage(); //! đặt lại Message mỗi khi chuyển sang tab Partner khác


  }

  socket.on('friendConnected', (userId,socketId) => {
    console.log(userId);
    console.log(socketId);
    if(userId) {
      console.log(partners);
      const updatePartners = [...partners]
    updatePartners.map(partner => {
      if (partner.partner._id == userId) {
        partner.partner.socketId = socketId
        return;
      }
      return;
    });
    setPartnerss(updatePartners)
    }
  })
   
  socket.on('clickTab', (message) => {
    setMessage(message)

  })

  function handleFocus(event, partnerId) {
    console.log(partnerId);
    socket.emit('focusNewMessage', user._id, partnerId, socket.id)


  }




  function handleSubmit(event, user, partner) {

    event.preventDefault();
    if (type.trim() !== '') {
      // Gọi hàm callback onSendMessage để gửi tin nhắn

      socket.emit('message', user, partner, type, socket.id)
      // Xóa nội dung của form sau khi gửi
      setType('');
    }

  }

  //! SOCKET
  socket.once('seenMessage', (partnerId) => {
    const updatePartners = [...partners]
    updatePartners.map(partner => {
      if (partner.partner._id == partnerId) {
        partner.lastMessage = {
          //   ... //! MAI LÀMMM
          ...partner.lastMessage,
          isSeen: true,
        }
        return;
      }
      return;
    });
    setPartnerss(updatePartners)
  })
  socket.once('partnerSeenMessage', (userId, lastMessageId) => {
    console.log(userId);
    //! thay đổi trạng thái isSeen của lastMessageId
    console.log(message);
    if (message) {
      const updateMessage = [...message.messages]
      updateMessage.map(message => {
        console.log(message.senderId._id);
        if (message.receiverId._id == userId) {
          message.isSeen = true;
        }

      })
      setMessage({...message, messages: updateMessage})
      console.log(updateMessage);
    }



    const updatePartners = [...partners]
    updatePartners.map(partner => {
      if (partner.partner._id == userId) {
        partner.lastMessage = {
          //   ... //! MAI LÀMMM
          ...partner.lastMessage,
          isSeen: true,
        }
        return;
      }
      return;
    });
    setPartnerss(updatePartners)
  })

  socket.once('message', (messageSocket) => {
    //! update Partners khi có tin nhắn mới đến
    const updatePartners = [...partners]
    updatePartners.map(partner => {
      if (partner.partner._id == messageSocket.receiverId._id) {
        partner.lastMessage = {
          ...messageSocket, // Tạo bản sao của đối tượng gốc
          senderId: messageSocket.senderId._id,
          receiverId: messageSocket.receiverId._id,
        };

        return;
      } else if (partner.partner._id == messageSocket.senderId._id) {

        partner.lastMessage = {
          ...messageSocket, // Tạo bản sao của đối tượng gốc
          senderId: messageSocket.senderId._id,
          receiverId: messageSocket.receiverId._id,
        };
        return;
      }
      return;
    });

    setPartnerss(updatePartners)

    if (message) {
      setMessage({
        ...message,
        messages: [...message.messages, messageSocket]
      })
    }

  })



  //! Hàm cuộn xuống message
  function scrollToBottomm(partnerId) {
    const chatContainer = document.getElementById(`chat-container-${partnerId}`);
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  useEffect(() => {
    loadPartners();
  }, []);
  //! sử lý cuộn mess
  useEffect(() => {
    if (message) {
      scrollToBottomm(message.partnerId)
    }
  }, [message]);



  return (
    <>
      <div>
        <header className="navbar-light fixed-top header-static bg-mode">
          {/* Logo Nav START */}
          <nav className="navbar navbar-expand-lg">
            <div className="container">
              {/* Logo START */}
              <a className="navbar-brand" href="index-2.html">
                <img className="light-mode-item navbar-brand-item" src="assets/images/logo.svg" alt="logo" />
                <img className="dark-mode-item navbar-brand-item" src="assets/images/logo.svg" alt="logo" />
              </a>
              {/* Logo END */}
              {/* Responsive navbar toggler */}
              <button className="navbar-toggler ms-auto icon-md btn btn-light p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-animation">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
              {/* Main navbar START */}
              <div className="collapse navbar-collapse" id="navbarCollapse">
                {/* Nav Search START */}
                <div className="nav mt-3 mt-lg-0 flex-nowrap align-items-center px-4 px-lg-0">
                  <div className="nav-item w-100">
                    <form className="rounded position-relative">
                      <input className="form-control ps-5 bg-light" type="search" placeholder="Search..." aria-label="Search" />
                      <button className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y" type="submit"><i className="bi bi-search fs-5"> </i></button>
                    </form>
                  </div>
                </div>
                {/* Nav Search END */}
                <ul className="navbar-nav navbar-nav-scroll ms-auto">
                  {/* Nav item 1 Demos */}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="homeMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Demo</a>
                    <ul className="dropdown-menu" aria-labelledby="homeMenu">
                      <li> <a className="dropdown-item" href="index-2.html">Home default</a></li>
                      <li> <a className="dropdown-item" href="index-classic.html">Home classic</a></li>
                      <li> <a className="dropdown-item" href="index-post.html">Home post</a></li>
                      <li> <a className="dropdown-item" href="index-video.html">Home video</a></li>
                      <li> <a className="dropdown-item" href="index-event.html">Home event</a></li>
                      <li> <a className="dropdown-item" href="landing.html">Landing page</a></li>
                      <li> <a className="dropdown-item" href="app-download.html">App download</a></li>
                      <li className="dropdown-divider" />
                      <li>
                        <a className="dropdown-item" href="https://themes.getbootstrap.com/store/webestica/" target="_blank">
                          <i className="text-success fa-fw bi bi-cloud-download-fill me-2" />Buy Social!
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* Nav item 2 Pages */}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="pagesMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                    <ul className="dropdown-menu" aria-labelledby="pagesMenu">
                      <li> <a className="dropdown-item" href="albums.html">Albums</a></li>
                      <li> <a className="dropdown-item" href="celebration.html">Celebration</a></li>
                      <li> <a className="dropdown-item" href="messaging.html">Messaging</a></li>
                      {/* Dropdown submenu */}
                      <li className="dropdown-submenu dropend">
                        <a className="dropdown-item dropdown-toggle" href="#!">Profile</a>
                        <ul className="dropdown-menu" data-bs-popper="none">
                          <li> <a className="dropdown-item" href="my-profile.html">Feed</a> </li>
                          <li> <a className="dropdown-item" href="my-profile-about.html">About</a> </li>
                          <li> <a className="dropdown-item" href="my-profile-connections.html">Connections</a> </li>
                          <li> <a className="dropdown-item" href="my-profile-media.html">Media</a> </li>
                          <li> <a className="dropdown-item" href="my-profile-videos.html">Videos</a> </li>
                          <li> <a className="dropdown-item" href="my-profile-events.html">Events</a> </li>
                          <li> <a className="dropdown-item" href="my-profile-activity.html">Activity</a> </li>
                        </ul>
                      </li>
                      <li> <a className="dropdown-item" href="events.html">Events</a></li>
                      <li> <a className="dropdown-item" href="events-2.html">Events 2</a></li>
                      <li> <a className="dropdown-item" href="event-details.html">Event details</a></li>
                      <li> <a className="dropdown-item" href="event-details-2.html">Event details 2</a></li>
                      <li> <a className="dropdown-item" href="groups.html">Groups</a></li>
                      <li> <a className="dropdown-item" href="group-details.html">Group details</a></li>
                      <li> <a className="dropdown-item" href="post-videos.html">Post videos</a></li>
                      <li> <a className="dropdown-item" href="post-video-details.html">Post video details</a></li>
                      <li> <a className="dropdown-item" href="post-details.html">Post details</a></li>
                      <li> <a className="dropdown-item" href="video-details.html">Video details</a></li>
                      <li> <a className="dropdown-item" href="blog.html">Blog</a></li>
                      <li> <a className="dropdown-item" href="blog-details.html">Blog details</a></li>
                      {/* Dropdown submenu levels */}
                      <li className="dropdown-divider" />
                      <li className="dropdown-submenu dropend">
                        <a className="dropdown-item dropdown-toggle" href="#">Dropdown levels</a>
                        <ul className="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                          <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                          <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                          {/* dropdown submenu open left */}
                          <li className="dropdown-submenu dropstart">
                            <a className="dropdown-item dropdown-toggle" href="#">Dropdown (start)</a>
                            <ul className="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                              <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                              <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                            </ul>
                          </li>
                          <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  {/* Nav item 3 Post */}
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="postMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account </a>
                    <ul className="dropdown-menu" aria-labelledby="postMenu">
                      <li> <a className="dropdown-item" href="create-page.html">Create a page</a></li>
                      <li> <a className="dropdown-item" href="settings.html">Settings</a> </li>
                      <li> <a className="dropdown-item" href="notifications.html">Notifications</a> </li>
                      <li> <a className="dropdown-item" href="help.html">Help center</a> </li>
                      <li> <a className="dropdown-item" href="help-details.html">Help details</a> </li>
                      {/* dropdown submenu open left */}
                      <li className="dropdown-submenu dropstart">
                        <a className="dropdown-item dropdown-toggle" href="#">Authentication</a>
                        <ul className="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                          <li> <a className="dropdown-item" href="sign-in.html">Sign in</a> </li>
                          <li> <a className="dropdown-item" href="sign-up.html">Sing up</a> </li>
                          <li> <a className="dropdown-item" href="forgot-password.html">Forgot password</a> </li>
                          <li className="dropdown-divider" />
                          <li> <a className="dropdown-item" href="sign-in-advance.html">Sign in advance</a> </li>
                          <li> <a className="dropdown-item" href="sign-up-advance.html">Sing up advance</a> </li>
                          <li> <a className="dropdown-item" href="forgot-password-advance.html">Forgot password advance</a> </li>
                        </ul>
                      </li>
                      <li> <a className="dropdown-item" href="error-404.html">Error 404</a> </li>
                      <li> <a className="dropdown-item" href="offline.html">Offline</a> </li>
                      <li> <a className="dropdown-item" href="privacy-and-terms.html">Privacy &amp; terms</a> </li>
                    </ul>
                  </li>
                  {/* Nav item 4 Mega menu */}
                  <li className="nav-item">
                    <a className="nav-link" href="my-profile-connections.html">My network</a>
                  </li>
                </ul>
              </div>
              {/* Main navbar END */}
              {/* Nav right START */}
              <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
                <li className="nav-item ms-2">
                  <a className="nav-link icon-md btn btn-light p-0" href="messaging.html">
                    <i className="bi bi-chat-left-text-fill fs-6"> </i>
                  </a>
                </li>
                <li className="nav-item ms-2">
                  <a className="nav-link icon-md btn btn-light p-0" href="settings.html">
                    <i className="bi bi-gear-fill fs-6"> </i>
                  </a>
                </li>
                <li className="nav-item dropdown ms-2">
                  <a className="nav-link icon-md btn btn-light p-0" href="#" id="notifDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                    <span className="badge-notif animation-blink" />
                    <i className="bi bi-bell-fill fs-6"> </i>
                  </a>
                  <div className="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0" aria-labelledby="notifDropdown">
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="m-0">Notifications <span className="badge bg-danger bg-opacity-10 text-danger ms-2">4 new</span></h6>
                        <a className="small" href="#">Clear all</a>
                      </div>
                      <div className="card-body p-0">
                        <ul className="list-group list-group-flush list-unstyled p-2">
                          {/* Notif item */}
                          <li>
                            <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                              <div className="avatar text-center d-none d-sm-inline-block">
                                <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt />
                              </div>
                              <div className="ms-sm-3">
                                <div className=" d-flex">
                                  <p className="small mb-2"><b>Judy Nguyen</b> sent you a friend request.</p>
                                  <p className="small ms-3 text-nowrap">Just now</p>
                                </div>
                                <div className="d-flex">
                                  <button className="btn btn-sm py-1 btn-primary me-2">Accept </button>
                                  <button className="btn btn-sm py-1 btn-danger-soft">Delete </button>
                                </div>
                              </div>
                            </div>
                          </li>
                          {/* Notif item */}
                          <li>
                            <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3 position-relative">
                              <div className="avatar text-center d-none d-sm-inline-block">
                                <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt />
                              </div>
                              <div className="ms-sm-3 d-flex">
                                <div>
                                  <p className="small mb-2">Wish <b>Amanda Reed</b> a happy birthday (Nov 12)</p>
                                  <button className="btn btn-sm btn-outline-light py-1 me-2">Say happy birthday 🎂</button>
                                </div>
                                <p className="small ms-3">2min</p>
                              </div>
                            </div>
                          </li>
                          {/* Notif item */}
                          <li>
                            <a href="#" className="list-group-item list-group-item-action rounded d-flex border-0 mb-1 p-3">
                              <div className="avatar text-center d-none d-sm-inline-block">
                                <div className="avatar-img rounded-circle bg-success"><span className="text-white position-absolute top-50 start-50 translate-middle fw-bold">WB</span></div>
                              </div>
                              <div className="ms-sm-3">
                                <div className="d-flex">
                                  <p className="small mb-2">Webestica has 15 like and 1 new activity</p>
                                  <p className="small ms-3">1hr</p>
                                </div>
                              </div>
                            </a>
                          </li>
                          {/* Notif item */}
                          <li>
                            <a href="#" className="list-group-item list-group-item-action rounded d-flex border-0 p-3 mb-1">
                              <div className="avatar text-center d-none d-sm-inline-block">
                                <img className="avatar-img rounded-circle" src="assets/images/logo/12.svg" alt />
                              </div>
                              <div className="ms-sm-3 d-flex">
                                <p className="small mb-2"><b>Bootstrap in the news:</b> The search giant’s parent company, Alphabet, just joined an exclusive club of tech stocks.</p>
                                <p className="small ms-3">4hr</p>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer text-center">
                        <a href="#" className="btn btn-sm btn-primary-soft">See all incoming activity</a>
                      </div>
                    </div>
                  </div>
                </li>
                {/* Notification dropdown END */}
                <li className="nav-item ms-2 dropdown">
                  <a className="nav-link btn icon-md p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                    <img className="avatar-img rounded-2" src="assets/images/avatar/07.jpg" alt />
                  </a>
                  <ul className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3" aria-labelledby="profileDropdown">
                    {/* Profile info */}
                    <li className="px-3">
                      <div className="d-flex align-items-center position-relative">
                        {/* Avatar */}
                        <div className="avatar me-3">
                          <img className="avatar-img rounded-circle" src="assets/images/avatar/07.jpg" alt="avatar" />
                        </div>
                        <div>
                          <a className="h6 stretched-link" href="#">Lori Ferguson</a>
                          <p className="small m-0">Web Developer</p>
                        </div>
                      </div>
                      <a className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center" href="my-profile.html">View profile</a>
                    </li>
                    {/* Links */}
                    <li><a className="dropdown-item" href="settings.html"><i className="bi bi-gear fa-fw me-2" />Settings &amp; Privacy</a></li>
                    <li>
                      <a className="dropdown-item" href="https://support.webestica.com/" target="_blank">
                        <i className="fa-fw bi bi-life-preserver me-2" />Support
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="docs/index.html" target="_blank">
                        <i className="fa-fw bi bi-card-text me-2" />Documentation
                      </a>
                    </li>
                    <li className="dropdown-divider" />
                    <li><a className="dropdown-item bg-danger-soft-hover" href="sign-in-advance.html"><i className="bi bi-power fa-fw me-2" />Sign Out</a></li>
                    <li> <hr className="dropdown-divider" /></li>
                    {/* Dark mode switch START */}
                    <li>
                      <div className="modeswitch-wrap" id="darkModeSwitch">
                        <div className="modeswitch-item">
                          <div className="modeswitch-icon" />
                        </div>
                        <span>Dark mode</span>
                      </div>
                    </li>
                    {/* Dark mode switch END */}
                  </ul>
                </li>
                {/* Profile START */}
              </ul>
              {/* Nav right END */}
            </div>
          </nav>
          {/* Logo Nav END */}
        </header>
        {/* =======================
Header END */}
        {/* **************** MAIN CONTENT START **************** */}
        <main>
          {/* Container START */}
          <div className="container">
            <div className="row gx-0">
              {/* Sidebar START */}
              <div className="col-lg-4 col-xxl-3" id="chatTabs" role="tablist">
                {/* Divider */}
                <div className="d-flex align-items-center mb-4 d-lg-none">
                  <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <i className="btn btn-primary fw-bold fa-solid fa-sliders" />
                    <span className="h6 mb-0 fw-bold d-lg-none ms-2">Chats</span>
                  </button>
                </div>
                {/* Advanced filter responsive toggler END */}
                <div className="card card-body border-end-0 border-bottom-0 rounded-bottom-0">
                  <div className=" d-flex justify-content-between align-items-center">
                    <h1 className="h5 mb-0">Active chats <span className="badge bg-success bg-opacity-10 text-success">6</span></h1>
                    {/* Chat new create message item START */}
                    <div className="dropend position-relative">
                      <div className="nav">
                        <a className="icon-md rounded-circle btn btn-sm btn-primary-soft nav-link toast-btn" data-target="chatToast" href="#"> <i className="bi bi-pencil-square" /> </a>
                      </div>
                    </div>
                    {/* Chat new create message item END */}
                  </div>
                </div>
                <nav className="navbar navbar-light navbar-expand-lg mx-0">
                  <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar">
                    {/* Offcanvas header */}
                    <div className="offcanvas-header">
                      <button type="button" className="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" />
                    </div>
                    {/* Offcanvas body */}
                    <div className="offcanvas-body p-0">
                      <div className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0">
                        {/* Search chat START */}
                        <form className="position-relative">
                          <input className="form-control py-2" type="search" placeholder="Search for chats" aria-label="Search" />
                          <button className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit">
                            <i className="bi bi-search fs-5" />
                          </button>
                        </form>
                        {/* Search chat END */}
                        {/* Chat list tab START */}
                        <div className="mt-4 h-100">
                          <div className="chat-tab-list custom-scrollbar">
                            <ul className="nav flex-column nav-pills nav-pills-soft">
                              {partners.map(partner => <li data-bs-dismiss="offcanvas">
                                <a onClick={() => { clickTab(partner.partner._id) }} href={`#chat-${partner.partner._id}`} className="nav-link  text-start" id={`chat-${partner.partner._id}-tab`} data-bs-toggle="pill" role="tab">
                                  <div className="d-flex">

                                    {partner.partner.socketId ?
                                      <div className="flex-shrink-0 avatar avatar-story me-2 status-online">
                                        <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                      </div>
                                      :
                                      <div className="flex-shrink-0 avatar avatar-story me-2 status-offline">
                                        <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                      </div>
                                    }


                                    <div className="flex-grow-1 d-block">
                                      <h6 className="mb-0 mt-1">{partner.partner.fullName}</h6>
                                      {(partner.lastMessage.senderId == user._id) ?
                                        <div className="small text-secondary">You: {partner.lastMessage.content}</div>
                                        :
                                        (
                                          partner.lastMessage.isSeen ? <div className="small text-secondary" style={{ fontWeight: 400 }}>{partner.lastMessage.content}</div>

                                            : <div className="small text-secondary" style={{ fontWeight: 600 }}>{partner.lastMessage.content}</div>

                                        )


                                      }

                                    </div>
                                  </div>
                                </a>
                              </li>)}

                              {/* Chat user tab item */}

                            </ul>
                          </div>
                        </div>
                        {/* Chat list tab END */}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              {/* Sidebar START */}
              {/* Chat conversation START */}
              <div className="col-lg-8 col-xxl-9">
                <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
                  <div className="card-body h-100">
                    <div className="tab-content py-0 mb-0 h-100" id="chatTabsContent">
                      {partners.map(partner => <div className="fade tab-pane h-100" id={`chat-${partner.partner._id}`} role="tabpanel" aria-labelledby={`chat-${partner.partner._id}-tab`}>
                        {/* Top avatar and status START */}
                        <div className="d-sm-flex justify-content-between align-items-center">
                          <div className="d-flex mb-2 mb-sm-0">
                            <div className="flex-shrink-0 avatar me-2">
                              <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                            </div>
                            <div className="d-block flex-grow-1">
                              <h6 className="mb-0 mt-1">{partner.partner.fullName}</h6>
                                      {partner.partner.socketId ?
                              <div className="small text-secondary"><i className="fa-solid fa-circle text-success me-1" />Online</div>
                                      :
                              <div className="small text-secondary"><i className="fa-solid fa-circle text-danger me-1" />Offline</div>

                                    }

                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            {/* Call button */}
                            <a href="#!" className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Audio call"><i className="bi bi-telephone-fill" /></a>
                            <a href="#!" className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Video call"><i className="bi bi-camera-video-fill" /></a>
                            {/* Card action START */}
                            <div className="dropdown">
                              <a className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" href="#" id="chatcoversationDropdown" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></a>
                              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="chatcoversationDropdown">
                                <li><a className="dropdown-item" href="#"><i className="bi bi-check-lg me-2 fw-icon" />Mark as read</a></li>
                                <li><a className="dropdown-item" href="#"><i className="bi bi-mic-mute me-2 fw-icon" />Mute conversation</a></li>
                                <li><a className="dropdown-item" href="#"><i className="bi bi-person-check me-2 fw-icon" />View profile</a></li>
                                <li><a className="dropdown-item" href="#"><i className="bi bi-trash me-2 fw-icon" />Delete chat</a></li>
                                <li className="dropdown-divider" />
                                <li><a className="dropdown-item" href="#"><i className="bi bi-archive me-2 fw-icon" />Archive chat</a></li>
                              </ul>
                            </div>
                            {/* Card action END */}
                          </div>
                        </div>
                        {/* Top avatar and status END */}
                        <hr />
                        {/* Chat conversation START */}
                        <div id={`chat-container-${partner.partner._id}`} className="chat-conversation-content custom-scrollbar chat-container" style={{ overflowY: 'scroll', }}  >
                          {/* Chat time */}
                          <div className="text-center small my-2">Jul 16, 2022, 06:15 am</div>
                          {/* Chat message left */}
                          {message ? <>  {message.messages.map((message) => {
                            if (message.senderId._id == partner.partner._id) {
                              return <div className="d-flex mb-1">
                                <div className="flex-shrink-0 avatar avatar-xs me-2">
                                  <img className="avatar-img rounded-circle" src={message.senderId.avatarUrl} alt />
                                </div>
                                <div className="flex-grow-1">
                                  <div className="w-100">
                                    <div className="d-flex flex-column align-items-start">
                                      <div className="bg-light text-secondary p-2 px-3 rounded-2">{message.content}</div>
                                      <div className="small my-2">{returnHour(message.date)}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            } else {
                              return <div className="d-flex justify-content-end text-end mb-1">
                                <div className="w-100">
                                  <div className="d-flex flex-column align-items-end">

                                    {message.isSeen ? <>
                                      <div className="bg-primary text-white p-2 px-3 rounded-2">{message.content}</div>
                                      <span>seen</span>
                                    </>

                                      :
                                      <div className="bg-primary text-white p-2 px-3 rounded-2">{message.content}</div>
                                    }
                                  </div>
                                </div>
                              </div>
                            }

                          })}</> : <div className="d-flex mb-1">

                            <div className="flex-grow-1">
                              <div className="w-100">
                                <div className="d-flex flex-column align-items-start">
                                  <div className="bg-light text-secondary p-3 rounded-2">
                                    <div className="typing d-flex align-items-center">
                                      <div className="dot" />
                                      <div className="dot" />
                                      <div className="dot" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          }


                        </div>
                        {/* Chat conversation END */}
                        <form className="card-footer" onSubmit={(e) => handleSubmit(e, user, partner.partner)}>
                          <div className="d-sm-flex align-items-end">
                            <textarea id={`my-textarea-${partner.partner._id}`} onFocus={(e) => { handleFocus(e, partner.partner._id) }} onChange={(e) => setType(e.target.value)} className="form-control mb-sm-0 mb-3" data-autoresize placeholder="Type a message" rows={1} value={type} />
                            <button className="btn btn-sm btn-danger-soft ms-sm-2"><i className="fa-solid fa-face-smile fs-6" /></button>
                            <button className="btn btn-sm btn-secondary-soft ms-2"><i className="fa-solid fa-paperclip fs-6" /></button>
                            <button type='submit' className="btn btn-sm btn-primary ms-2"><i className="fa-solid fa-paper-plane fs-6" /></button>
                          </div>
                        </form>
                      </div>)}

                    </div>
                  </div>

                </div>
              </div>
              {/* Chat conversation END */}
            </div> {/* Row END */}
            {/* =======================
  Chat END */}
          </div>
          {/* Container END */}
        </main>
        {/* **************** MAIN CONTENT END **************** */}
        {/* Chat START */}
        <div className="position-fixed bottom-0 end-0 p-3">
          {/* Chat toast START */}
          <div id="chatToast" className="toast bg-mode" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
            <div className="toast-header bg-mode d-flex justify-content-between">
              {/* Title */}
              <h6 className="mb-0">New message</h6>
              <button className="btn btn-secondary-soft-hover py-1 px-2" data-bs-dismiss="toast" aria-label="Close"><i className="fa-solid fa-xmark" /></button>
            </div>
            {/* Top avatar and status END */}
            <div className="toast-body collapse show" id="collapseChat">
              {/* Chat conversation START */}
              {/* Form */}
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text border-0">To</span>
                  <input className="form-control" type="text" placeholder="Type a name or multiple names" />
                </div>
              </form>
              {/* Chat conversation END */}
              {/* Extra space */}
              <div className="h-200px" />
              {/* Button  */}
              <div className="d-sm-flex align-items-end">
                <textarea className="form-control mb-sm-0 mb-3" placeholder="Type a message" rows={1} spellCheck="false" defaultValue={""} />
                <button className="btn btn-sm btn-danger-soft ms-sm-2"><i className="fa-solid fa-face-smile fs-6" /></button>
                <button className="btn btn-sm btn-secondary-soft ms-2"><i className="fa-solid fa-paperclip fs-6" /></button>
                <button className="btn btn-sm btn-primary ms-2"><i className="fa-solid fa-paper-plane fs-6" /></button>
              </div>
            </div>
          </div>
          {/* Chat toast END */}
        </div>
        {/* Chat END */}
      </div>

    </>
  )
}
