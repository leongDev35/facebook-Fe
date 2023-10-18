import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { SITE, socket } from '../../App';





export default function NavBar({ user }) {
  const [endCursor, setEndCursor] = useState(null);
  const [notifs, setNotifs] = useState();
  const [isSeen, setIsSeen] = useState(false);


  async function handleResponseFriendRequest(friendId, response, notifId) {

    if (response == "accept") {
      socket.emit('accept', notifId, friendId, user._id)
      const updatedNotifs = notifs.map(notif => {
        if (notif._id.toString() == notifId.toString()) {
          notif.typeNotif = "accept"
          return notif; // Thay thế bài post cần thay thế
        }
        return notif; // Giữ nguyên bài post khác
      });
      setNotifs(updatedNotifs)

    } else if (response == "reject") {
      socket.emit('reject', notifId)
      const updatedNotifs = notifs.map(notif => {
        if (notif._id.toString() == notifId.toString()) {
          notif.typeNotif = "reject"
          return notif; // Thay thế bài post cần thay thế
        }
        return notif; // Giữ nguyên bài post khác
      });
      setNotifs(updatedNotifs)
    }
    const serverData = await axios.post(`${SITE}/users/friend/accept`, {

      userId: user._id,
      senderId: friendId,
      response: response
      // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL

    });
  }
  const handleClick = () => {
    setIsSeen(true)
  }

  // const tatCaIsSeenLaFalse = notifs.every(obj => obj.isSeen === false);
  // if (tatCaIsSeenLaFalse) {
  //   setIsSeen(false)
  // } else {
  //   setIsSeen(true)
  // }
  const loadNotifs = async () => { //! hàm load posts ban đầu, 
    try {
      const response = await axios.get(`${SITE}/users/notif`, {
        params: {
          userId: user._id,
        },
      });
      const newNotifs = response.data.notifs;
      setNotifs(newNotifs);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {

    loadNotifs();

  }, []);


  //! Socket
  socket.once('likeNotif', (test) => {
    setIsSeen(false)
    if (notifs) {
      setNotifs([test, ...notifs]
      )
    }
  })



  //! like 
  //! comment
  //! gửi lời mời kết bạn



  function tinhThoiGianChenhLech(dateString) {
    // Chuyển đổi chuỗi date thành đối tượng Date
    const date = new Date(dateString);

    // Lấy thời điểm hiện tại
    const now = new Date();

    // Tính số thời gian chênh lệch (tính bằng mili giây)
    const thoiGianChenhLech = date - now;

    //! Chuyển đổi sang giây và làm tròn
    let thoiGianChenhLechGiay = -Math.floor(thoiGianChenhLech / 1000);
    const thoiGianChenhLechGiayTong = thoiGianChenhLechGiay;
    const giayTrongPhut = 60;
    const giayTrongGio = 3600;
    const giayTrongNgay = 86400;
    const ngay = Math.floor(thoiGianChenhLechGiay / giayTrongNgay);
    thoiGianChenhLechGiay %= giayTrongNgay; //! lưu lại phần dư sau khi chia cho ngày

    const gio = Math.floor(thoiGianChenhLechGiay / giayTrongGio);
    thoiGianChenhLechGiay %= giayTrongGio;
    const phut = Math.floor(thoiGianChenhLechGiay / giayTrongPhut);

    if (thoiGianChenhLechGiayTong < 60) {
      return "Just now"
    } else if (thoiGianChenhLechGiayTong < 3600) { //! nếu thời gian nhỏ hơn 1 ngày
      return `${phut} minutes`
    } else if (thoiGianChenhLechGiayTong < 86400) { //! nếu thời gian nhỏ hơn 1 ngày
      return `${gio} hr`
    } else {
      return `${ngay} day ago`
    }

  }


  return (
    <>
      {/*Header START */}
      <header className="navbar-light fixed-top header-static bg-mode">
        {/* Logo Nav START */}
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            {/* Logo START */}
            <Link className="navbar-brand" to={"/"}>
              <img className="light-mode-item navbar-brand-item" src="/assets/images/logo.svg" alt="logo" />
              <img className="dark-mode-item navbar-brand-item" src="/assets/images/logo.svg" alt="logo" />
            </Link>
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

            </div>
            {/* Main navbar END */}
            {/* Nav right START */}
            <ul className="nav flex-nowrap align-items-center ms-sm-3 list-unstyled">
              <li className="nav-item ms-2">
                <Link className="nav-link icon-md btn btn-light p-0" to="/message">
                  <i className="bi bi-chat-left-text-fill fs-6"> </i>
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link className="nav-link icon-md btn btn-light p-0" to="/setting">
                  <i className="bi bi-gear-fill fs-6"> </i>
                </Link>
              </li>
              <li onClick={() => {
                handleClick()
              }} className="nav-item dropdown ms-2">
                <a className="nav-link icon-md btn btn-light p-0" href="#" id="notifDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">

                  {isSeen ? null :
                    <span className="badge-notif animation-blink" />
                  }
                  <i className="bi bi-bell-fill fs-6"> </i>
                </a>
                <div className="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg border-0" aria-labelledby="notifDropdown">
                  <div className="card" style={{ overflowY: 'scroll', height: 780 }}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h6 className="m-0">Notifications <span className="badge bg-danger bg-opacity-10 text-danger ms-2">4 new</span></h6>
                      <a className="small" href="#">Clear all</a>
                    </div>
                    <div className="card-body p-0">
                      {notifs ?
                        <ul className="list-group list-group-flush list-unstyled p-2">
                          {/* Notif item */}

                          {notifs.map(notif =>

                            (notif.typeNotif === "like") ?
                              <Link to={`/post/${notif.postId}`}>


                                <li>
                                  <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3 position-relative">
                                    <div className="avatar text-center d-none d-sm-inline-block">
                                      <img className="avatar-img rounded-circle" src={notif.actionUser.avatarUrl} alt />
                                    </div>
                                    <div className="ms-sm-3 d-flex">
                                      <div>
                                        <p className="small mb-2"><b>{notif.actionUser.fullName}</b> like your post </p>
                                      </div>
                                      <p className="small ms-3">{tinhThoiGianChenhLech(notif.date)}</p>
                                    </div>
                                  </div>
                                </li>
                              </Link>


                              : (notif.typeNotif === "friend") ?
                                <li>
                                  <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                                    <div className="avatar text-center d-none d-sm-inline-block">
                                      <img className="avatar-img rounded-circle" src={notif.actionUser.avatarUrl} alt />
                                    </div>
                                    <div className="ms-sm-3">
                                      <div className=" d-flex">
                                        <p className="small mb-2"><b>{notif.actionUser.fullName}</b> sent you a friend request.</p>
                                        <p className="small ms-3 text-nowrap">{tinhThoiGianChenhLech(notif.date)}</p>
                                      </div>
                                      <div className="d-flex">
                                        <button onClick={() => {
                                          handleResponseFriendRequest(notif.actionUser._id, "accept", notif._id);
                                        }} className="btn btn-sm py-1 btn-primary me-2">Accept </button>
                                        <button onClick={() => {
                                          handleResponseFriendRequest(notif.actionUser._id, "reject", notif._id);
                                        }} className="btn btn-sm py-1 btn-danger-soft">Delete </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                : (notif.typeNotif === "accept") ?
                                  <li>
                                    <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                                      <div className="avatar text-center d-none d-sm-inline-block">
                                        <img className="avatar-img rounded-circle" src={notif.actionUser.avatarUrl} alt />
                                      </div>
                                      <div className="ms-sm-3">
                                        <div className=" d-flex">
                                          <p className="small mb-2"><b>{notif.actionUser.fullName}</b> sent you a friend request.</p>
                                          <p className="small ms-3 text-nowrap">{tinhThoiGianChenhLech(notif.date)}</p>
                                        </div>
                                        <div className="d-flex">
                                          Request is accepted
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  : (notif.typeNotif === "acceptYourRequest") ?
                                    <li>
                                      <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                                        <div className="avatar text-center d-none d-sm-inline-block">
                                          <img className="avatar-img rounded-circle" src={notif.actionUser.avatarUrl} alt />
                                        </div>
                                        <div className="ms-sm-3">
                                          <div className=" d-flex">
                                            <p className="small mb-2"><b>{notif.actionUser.fullName}</b> accepted your friend request.</p>
                                            <p className="small ms-3 text-nowrap">{tinhThoiGianChenhLech(notif.date)}</p>
                                          </div>

                                        </div>
                                      </div>
                                    </li>
                                    : (notif.typeNotif === "reject") ?
                                      <li>
                                        <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                                          <div className="avatar text-center d-none d-sm-inline-block">
                                            <img className="avatar-img rounded-circle" src={notif.actionUser.avatarUrl} alt />
                                          </div>
                                          <div className="ms-sm-3">
                                            <div className=" d-flex">
                                              <p className="small mb-2"><b>{notif.actionUser.fullName}</b> sent you a friend request.</p>
                                              <p className="small ms-3 text-nowrap">{tinhThoiGianChenhLech(notif.date)}</p>
                                            </div>
                                            <div className="d-flex">
                                              Request removed
                                            </div>
                                          </div>
                                        </div>
                                      </li>

                                      : (notif.typeNotif === "comment") ?
                                        <Link to={`/post/${notif.postId}`}>

                                          <li>
                                            <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3 position-relative">
                                              <div className="avatar text-center d-none d-sm-inline-block">
                                                <img className="avatar-img rounded-circle" src={notif.actionUser.avatarUrl} alt />
                                              </div>
                                              <div className="ms-sm-3 d-flex">
                                                <div>
                                                  <p className="small mb-2"><b>{notif.actionUser.fullName}</b> comment on your post </p>
                                                </div>
                                                <p className="small ms-3">{tinhThoiGianChenhLech(notif.date)}</p>
                                              </div>
                                            </div>
                                          </li>
                                        </Link>


                                        : null


                          )}

                        </ul>
                        : null}

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
                  <img className="avatar-img rounded-2" src={user.avatarUrl} alt />
                </a>
                <ul className="dropdown-menu dropdown-animation dropdown-menu-end pt-3 small me-md-n3" aria-labelledby="profileDropdown">
                  {/* Profile info */}
                  <li className="px-3">
                    <div className="d-flex align-items-center position-relative">
                      {/* Avatar */}
                      <div className="avatar me-3">
                        <img className="avatar-img rounded-circle" src={user.avatarUrl} alt="avatar" />
                      </div>
                      <div>
                        <a className="h6 stretched-link" href="#">{user.fullName}</a>
                        <p className="small m-0">Web Developer</p>
                      </div>
                    </div>
                    <Link className="dropdown-item btn btn-primary-soft btn-sm my-2 text-center" to={'/mypost'}>View profile</Link>
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
                  <li><a className="dropdown-item bg-danger-soft-hover" href={'/login'} onClick={
                    () => { localStorage.clear() }
                  } ><i
                      className="bi bi-power fa-fw me-2" />Sign Out</a></li>
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
    </>
  )
}
