import React from 'react'

export default function Profile() {
  return (
    <div>
      

<div>
  {/* =======================
Header START */}
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
      <div className="row g-4">
        {/* Main content START */}
        <div className="col-lg-8 vstack gap-4">
          {/* My profile START */}
          <div className="card">
            {/* Cover image */}
            <div className="h-200px rounded-top" style={{backgroundImage: 'url(assets/images/bg/05.jpg)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} />
            {/* Card body START */}
            <div className="card-body py-0">
              <div className="d-sm-flex align-items-start text-center text-sm-start">
                <div>
                  {/* Avatar */}
                  <div className="avatar avatar-xxl mt-n5 mb-3">
                    <img className="avatar-img rounded-circle border border-white border-3" src="assets/images/avatar/07.jpg" alt />
                  </div>
                </div>
                <div className="ms-sm-4 mt-sm-3">
                  {/* Info */}
                  <h1 className="mb-0 h5">Sam Lanson <i className="bi bi-patch-check-fill text-success small" /></h1>
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
                <li className="nav-item"> <a className="nav-link active" href="my-profile.html"> Posts </a> </li>
                <li className="nav-item"> <a className="nav-link" href="my-profile-about.html"> About </a> </li>
                <li className="nav-item"> <a className="nav-link" href="my-profile-connections.html"> Connections <span className="badge bg-success bg-opacity-10 text-success small"> 230</span> </a> </li>
                <li className="nav-item"> <a className="nav-link" href="my-profile-media.html"> Media</a> </li>
                <li className="nav-item"> <a className="nav-link" href="my-profile-videos.html"> Videos</a> </li>
                <li className="nav-item"> <a className="nav-link" href="my-profile-events.html"> Events</a> </li>
                <li className="nav-item"> <a className="nav-link" href="my-profile-activity.html"> Activity</a> </li>
              </ul>
            </div>
          </div>
          {/* My profile END */}
          {/* Share feed START */}
          <div className="card card-body">
            <div className="d-flex mb-3">
              {/* Avatar */}
              <div className="avatar avatar-xs me-2">
                <a href="#"> <img className="avatar-img rounded-circle" src="assets/images/avatar/07.jpg" alt /> </a>
              </div>
              {/* Post input */}
              <form className="w-100">
                <input className="form-control pe-4 border-0" placeholder="Share your thoughts..." data-bs-toggle="modal" data-bs-target="#modalCreateFeed" />
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
              <li className="nav-item dropdown ms-sm-auto">
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
          <div className="card">
            {/* Card header START */}
            <div className="card-header border-0 pb-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {/* Avatar */}
                  <div className="avatar avatar-story me-2">
                    <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt /> </a>
                  </div>
                  {/* Info */}
                  <div>
                    <div className="nav nav-divider">
                      <h6 className="nav-item card-title mb-0"> <a href="#!"> Lori Ferguson </a></h6>
                      <span className="nav-item small"> 2hr</span>
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
              <p>I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.</p>
              {/* Card img */}
              <img className="card-img" src="assets/images/post/3by2/01.jpg" alt="Post" />
              {/* Feed react START */}
              <ul className="nav nav-stack py-3 small">
                <li className="nav-item">
                  <a className="nav-link active" href="#!"> <i className="bi bi-hand-thumbs-up-fill pe-1" />Liked (56)</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#!"> <i className="bi bi-chat-fill pe-1" />Comments (12)</a>
                </li>
                {/* Card share action START */}
                <li className="nav-item dropdown ms-sm-auto">
                  <a className="nav-link mb-0" href="#" id="cardShareAction8" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-reply-fill flip-horizontal ps-1" />Share (3)
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
              <div className="d-flex mb-3">
                {/* Avatar */}
                <div className="avatar avatar-xs me-2">
                  <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/avatar/12.jpg" alt /> </a>
                </div>
                {/* Comment box  */}
                <form className="position-relative w-100">
                  <textarea className="form-control pe-4 bg-light" rows={1} placeholder="Add a comment..." defaultValue={""} />
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
            {/* Card footer END */}
          </div>
          {/* Card feed item END */}
          {/* Card feed item START */}
          <div className="card">
            <div className="border-bottom">
              <p className="small mb-0 px-4 py-2"><i className="bi bi-heart-fill text-danger pe-1" />Sam Lanson likes this post</p>
            </div>
            {/* Card header START */}
            <div className="card-header border-0 pb-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {/* Avatar */}
                  <div className="avatar me-2">
                    <a href="#"> <img className="avatar-img rounded-circle" src="assets/images/logo/13.svg" alt /> </a>
                  </div>
                  {/* Title */}
                  <div>
                    <h6 className="card-title mb-0"> <a href="#!"> Apple Education </a></h6>
                    <p className="mb-0 small">9 November at 23:29</p>
                  </div>
                </div>
                {/* Card share action menu */}
                <a href="#" className="text-secondary btn btn-secondary-soft-hover py-1 px-2" id="cardShareAction5" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-three-dots" />
                </a>
                {/* Card share action dropdown menu */}
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardShareAction5">
                  <li><a className="dropdown-item" href="#"> <i className="bi bi-bookmark fa-fw pe-2" />Save post</a></li>
                  <li><a className="dropdown-item" href="#"> <i className="bi bi-person-x fa-fw pe-2" />Unfollow lori ferguson </a></li>
                  <li><a className="dropdown-item" href="#"> <i className="bi bi-x-circle fa-fw pe-2" />Hide post</a></li>
                  <li><a className="dropdown-item" href="#"> <i className="bi bi-slash-circle fa-fw pe-2" />Block</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#"> <i className="bi bi-flag fa-fw pe-2" />Report post</a></li>
                </ul>
              </div>
              {/* Card share action END */}
            </div>
            {/* Card header START */}
            {/* Card body START */}
            <div className="card-body pb-0">
              <p>Find out how you can save time in the classroom this year. Earn recognition while you learn new skills on iPad and Mac. Start  recognition your first Apple Teacher badge today!</p>
              {/* Feed react START */}
              <ul className="nav nav-stack pb-2 small">
                <li className="nav-item">
                  <a className="nav-link active text-secondary" href="#!"> <i className="bi bi-heart-fill me-1 icon-xs bg-danger text-white rounded-circle" /> Louis, Billy and 126 others </a>
                </li>
                <li className="nav-item ms-sm-auto">
                  <a className="nav-link" href="#!"> <i className="bi bi-chat-fill pe-1" />Comments (12)</a>
                </li>
              </ul>
              {/* Feed react END */}
            </div>
            {/* Card body END */}
            {/* Card Footer START */}
            <div className="card-footer py-3">
              {/* Feed react START */}
              <ul className="nav nav-fill nav-stack small">
                <li className="nav-item">
                  <a className="nav-link mb-0 active" href="#!"> <i className="bi bi-heart pe-1" />Liked (56)</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mb-0" href="#!"> <i className="bi bi-chat-fill pe-1" />Comments (12)</a>
                </li>
                {/* Card share action dropdown START */}
                <li className="nav-item dropdown">
                  <a href="#" className="nav-link mb-0" id="cardShareAction6" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-reply-fill flip-horizontal ps-1" />Share (3)
                  </a>
                  {/* Card share action dropdown menu */}
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="cardShareAction6">
                    <li><a className="dropdown-item" href="#"> <i className="bi bi-envelope fa-fw pe-2" />Send via Direct Message</a></li>
                    <li><a className="dropdown-item" href="#"> <i className="bi bi-bookmark-check fa-fw pe-2" />Bookmark </a></li>
                    <li><a className="dropdown-item" href="#"> <i className="bi bi-link fa-fw pe-2" />Copy link to post</a></li>
                    <li><a className="dropdown-item" href="#"> <i className="bi bi-share fa-fw pe-2" />Share post via …</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#"> <i className="bi bi-pencil-square fa-fw pe-2" />Share to News Feed</a></li>
                  </ul>
                </li>
                {/* Card share action dropdown END */}
                <li className="nav-item">
                  <a className="nav-link mb-0" href="#!"> <i className="bi bi-send-fill pe-1" />Send</a>
                </li>
              </ul>
              {/* Feed react END */}
            </div>
            {/* Card Footer END */}
          </div>
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
                <div className="card-header d-flex justify-content-between border-0">
                  <h5 className="card-title">Experience</h5>
                  <a className="btn btn-primary-soft btn-sm" href="#!"> <i className="fa-solid fa-plus" /> </a>
                </div>
                {/* Card header END */}
                {/* Card body START */}
                <div className="card-body position-relative pt-0">
                  {/* Experience item START */}
                  <div className="d-flex">
                    {/* Avatar */}
                    <div className="avatar me-3">
                      <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/logo/08.svg" alt /> </a>
                    </div>
                    {/* Info */}
                    <div>
                      <h6 className="card-title mb-0"><a href="#!"> Apple Computer, Inc. </a></h6>
                      <p className="small">May 2015 – Present Employment Duration 8 mos <a className="btn btn-primary-soft btn-xs ms-2" href="#!">Edit </a></p>
                    </div>
                  </div>
                  {/* Experience item END */}
                  {/* Experience item START */}
                  <div className="d-flex">
                    {/* Avatar */}
                    <div className="avatar me-3">
                      <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/logo/09.svg" alt /> </a>
                    </div>
                    {/* Info */}
                    <div>
                      <h6 className="card-title mb-0"><a href="#!"> Microsoft Corporation </a></h6>
                      <p className="small">May 2017 – Present Employment Duration 1 yrs 5 mos <a className="btn btn-primary-soft btn-xs ms-2" href="#!">Edit </a></p>
                    </div>
                  </div>
                  {/* Experience item END */}
                  {/* Experience item START */}
                  <div className="d-flex">
                    {/* Avatar */}
                    <div className="avatar me-3">
                      <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/logo/10.svg" alt /> </a>
                    </div>
                    {/* Info */}
                    <div>
                      <h6 className="card-title mb-0"><a href="#!"> Tata Consultancy Services. </a></h6>
                      <p className="small mb-0">May 2022 – Present Employment Duration 6 yrs 10 mos <a className="btn btn-primary-soft btn-xs ms-2" href="#!">Edit </a></p>
                    </div>
                  </div>
                  {/* Experience item END */}
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
            {/* Card START */}
            <div className="col-md-6 col-lg-12">
              <div className="card">
                {/* Card header START */}
                <div className="card-header d-sm-flex justify-content-between align-items-center border-0">
                  <h5 className="card-title">Friends <span className="badge bg-danger bg-opacity-10 text-danger">230</span></h5>
                  <a className="btn btn-primary-soft btn-sm" href="#!"> See all friends</a>
                </div>
                {/* Card header END */}
                {/* Card body START */}
                <div className="card-body position-relative pt-0">
                  <div className="row g-3">
                    <div className="col-6">
                      {/* Friends item START */}
                      <div className="card shadow-none text-center h-100">
                        {/* Card body */}
                        <div className="card-body p-2 pb-0">
                          <div className="avatar avatar-story avatar-xl">
                            <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt /></a>
                          </div>
                          <h6 className="card-title mb-1 mt-3"> <a href="#!"> Amanda Reed </a></h6>
                          <p className="mb-0 small lh-sm">16 mutual connections</p>
                        </div>
                        {/* Card footer */}
                        <div className="card-footer p-2 border-0">
                          <button className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Send message"> <i className="bi bi-chat-left-text" /> </button>
                          <button className="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove friend"> <i className="bi bi-person-x" /> </button>
                        </div>
                      </div>
                      {/* Friends item END */}
                    </div>
                    <div className="col-6">
                      {/* Friends item START */}
                      <div className="card shadow-none text-center h-100">
                        {/* Card body */}
                        <div className="card-body p-2 pb-0">
                          <div className="avatar avatar-xl">
                            <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt /></a>
                          </div>
                          <h6 className="card-title mb-1 mt-3"> <a href="#!"> Samuel Bishop </a></h6>
                          <p className="mb-0 small lh-sm">22 mutual connections</p>
                        </div>
                        {/* Card footer */}
                        <div className="card-footer p-2 border-0">
                          <button className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Send message"> <i className="bi bi-chat-left-text" /> </button>
                          <button className="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove friend"> <i className="bi bi-person-x" /> </button>
                        </div>
                      </div>
                      {/* Friends item END */}
                    </div>
                    <div className="col-6">
                      {/* Friends item START */}
                      <div className="card shadow-none text-center h-100">
                        {/* Card body */}
                        <div className="card-body p-2 pb-0">
                          <div className="avatar avatar-xl">
                            <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt /></a>
                          </div>
                          <h6 className="card-title mb-1 mt-3"> <a href="#"> Bryan Knight </a></h6>
                          <p className="mb-0 small lh-sm">1 mutual connection</p>
                        </div>
                        {/* Card footer */}
                        <div className="card-footer p-2 border-0">
                          <button className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Send message"> <i className="bi bi-chat-left-text" /> </button>
                          <button className="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove friend"> <i className="bi bi-person-x" /> </button>
                        </div>
                      </div>
                      {/* Friends item END */}
                    </div>
                    <div className="col-6">
                      {/* Friends item START */}
                      <div className="card shadow-none text-center h-100">
                        {/* Card body */}
                        <div className="card-body p-2 pb-0">
                          <div className="avatar avatar-xl">
                            <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt /></a>
                          </div>
                          <h6 className="card-title mb-1 mt-3"> <a href="#!"> Amanda Reed </a></h6>
                          <p className="mb-0 small lh-sm">15 mutual connections</p>
                        </div>
                        {/* Card footer */}
                        <div className="card-footer p-2 border-0">
                          <button className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Send message"> <i className="bi bi-chat-left-text" /> </button>
                          <button className="btn btn-sm btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove friend"> <i className="bi bi-person-x" /> </button>
                        </div>
                      </div>
                      {/* Friends item END */}
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
  {/* **************** MAIN CONTENT END **************** */}
  {/* Modal create Feed START */}
  <div className="modal fade" id="modalCreateFeed" tabIndex={-1} aria-labelledby="modalLabelCreateFeed" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        {/* Modal feed header START */}
        <div className="modal-header">
          <h5 className="modal-title" id="modalLabelCreateFeed">Create post</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        {/* Modal feed header END */}
        {/* Modal feed body START */}
        <div className="modal-body">
          {/* Add Feed */}
          {/* Feed rect END */}
        </div>
        {/* Modal feed body END */}
        {/* Modal feed footer */}
        <div className="modal-footer row justify-content-between">
          {/* Select */}
          <div className="col-lg-3">
            <select className="form-select js-choice" data-position="top" data-search-enabled="false">
              <option value="PB">Public</option>
              <option value="PV">Friends</option>
              <option value="PV">Only me</option>
              <option value="PV">Custom</option>
            </select>
          </div>
          {/* Button */}
          <div className="col-lg-8 text-sm-end">
            <button type="button" className="btn btn-danger-soft me-2"> <i className="bi bi-camera-video-fill pe-1" /> Live video</button>
            <button type="button" className="btn btn-success-soft">Post</button>
          </div>
        </div>
        {/* Modal feed footer */}
      </div>
    </div>
  </div>
  {/* Modal create feed END */}
  {/* Modal create Feed photo START */}
  <div className="modal fade" id="feedActionPhoto" tabIndex={-1} aria-labelledby="feedActionPhotoLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        {/* Modal feed header START */}
        <div className="modal-header">
          <h5 className="modal-title" id="feedActionPhotoLabel">Add post photo</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        {/* Modal feed header END */}
        {/* Modal feed body START */}
        <div className="modal-body">
          {/* Add Feed */}
          <div className="d-flex mb-3">
            {/* Avatar */}
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt />
            </div>
            {/* Feed box  */}
            <form className="w-100">
              <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows={2} placeholder="Share your thoughts..." defaultValue={""} />
            </form>
          </div>
          {/* Dropzone photo START */}
          <div>
            <label className="form-label">Upload attachment</label>
            <div className="dropzone dropzone-default card shadow-none" data-dropzone="{&quot;maxFiles&quot;:2}">
              <div className="dz-message">
                <i className="bi bi-images display-3" />
                <p>Drag here or click to upload photo.</p>
              </div>
            </div>
          </div>
          {/* Dropzone photo END */}
        </div>
        {/* Modal feed body END */}
        {/* Modal feed footer */}
        <div className="modal-footer ">
          {/* Button */}
          <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-success-soft">Post</button>
        </div>
        {/* Modal feed footer */}
      </div>
    </div>
  </div>
  {/* Modal create Feed photo END */}
  {/* Modal create Feed video START */}
  <div className="modal fade" id="feedActionVideo" tabIndex={-1} aria-labelledby="feedActionVideoLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        {/* Modal feed header START */}
        <div className="modal-header">
          <h5 className="modal-title" id="feedActionVideoLabel">Add post video</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        {/* Modal feed header END */}
        {/* Modal feed body START */}
        <div className="modal-body">
          {/* Add Feed */}
          <div className="d-flex mb-3">
            {/* Avatar */}
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt />
            </div>
            {/* Feed box  */}
            <form className="w-100">
              <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows={2} placeholder="Share your thoughts..." defaultValue={""} />
            </form>
          </div>
          {/* Dropzone photo START */}
          <div>
            <label className="form-label">Upload attachment</label>
            <div className="dropzone dropzone-default card shadow-none" data-dropzone="{&quot;maxFiles&quot;:2}">
              <div className="dz-message">
                <i className="bi bi-camera-reels display-3" />
                <p>Drag here or click to upload video.</p>
              </div>
            </div>
          </div>
          {/* Dropzone photo END */}
        </div>
        {/* Modal feed body END */}
        {/* Modal feed footer */}
        <div className="modal-footer">
          {/* Button */}
          <button type="button" className="btn btn-danger-soft me-2"><i className="bi bi-camera-video-fill pe-1" /> Live video</button>
          <button type="button" className="btn btn-success-soft">Post</button>
        </div>
        {/* Modal feed footer */}
      </div>
    </div>
  </div>
  {/* Modal create Feed video END */}
  {/* Modal create events START */}
  <div className="modal fade" id="modalCreateEvents" tabIndex={-1} aria-labelledby="modalLabelCreateAlbum" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        {/* Modal feed header START */}
        <div className="modal-header">
          <h5 className="modal-title" id="modalLabelCreateAlbum">Create event</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        {/* Modal feed header END */}
        {/* Modal feed body START */}
        <div className="modal-body">
          {/* Form START */}
          <form className="row g-4">
            {/* Title */}
            <div className="col-12">
              <label className="form-label">Title</label>
              <input type="email" className="form-control" placeholder="Event name here" />
            </div>
            {/* Description */}
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={2} placeholder="Ex: topics, schedule, etc." defaultValue={""} />
            </div>
            {/* Date */}
            <div className="col-sm-4">
              <label className="form-label">Date</label>
              <input type="text" className="form-control flatpickr" placeholder="Select date" />
            </div>
            {/* Time */}
            <div className="col-sm-4">
              <label className="form-label">Time</label>
              <input type="text" className="form-control flatpickr" data-enabletime="true" data-nocalendar="true" placeholder="Select time" />
            </div>
            {/* Duration */}
            <div className="col-sm-4">
              <label className="form-label">Duration</label>
              <input type="email" className="form-control" placeholder="1hr 23m" />
            </div>
            {/* Location */}
            <div className="col-12">
              <label className="form-label">Location</label>
              <input type="email" className="form-control" placeholder="Logansport, IN 46947" />
            </div>
            {/* Add guests */}
            <div className="col-12">
              <label className="form-label">Add guests</label>
              <input type="email" className="form-control" placeholder="Guest email" />
            </div>
            {/* Avatar group START */}
            <div className="col-12 mt-3">
              <ul className="avatar-group list-unstyled align-items-center mb-0">
                <li className="avatar avatar-xs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/06.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/07.jpg" alt="avatar" />
                </li>
                <li className="ms-3">
                  <small> +50 </small>
                </li>
              </ul>
            </div>
            {/* Upload Photos or Videos */}
            {/* Dropzone photo START */}
            <div>
              <label className="form-label">Upload attachment</label>
              <div className="dropzone dropzone-default card shadow-none" data-dropzone="{&quot;maxFiles&quot;:2}">
                <div className="dz-message">
                  <i className="bi bi-file-earmark-text display-3" />
                  <p>Drop presentation and document here or click to upload.</p>
                </div>
              </div>
            </div>
            {/* Dropzone photo END */}
          </form>
          {/* Form END */}
        </div>
        {/* Modal feed body END */}
        {/* Modal footer */}
        {/* Button */}
        <div className="modal-footer">
          <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal"> Cancel</button>
          <button type="button" className="btn btn-success-soft">Create now</button>
        </div>
      </div>
    </div>
  </div>
  <script src="assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>


<script src="assets/vendor/dropzone/dist/dropzone.js"></script>
<script src="assets/vendor/choices.js/public/assets/scripts/choices.min.js"></script>
<script src="assets/vendor/glightbox-master/dist/js/glightbox.min.js"></script>
<script src="assets/vendor/flatpickr/dist/flatpickr.min.js"></script>

<script src="assets/js/functions.js"></script>
  {/* Modal create events END */}
  {/* =======================
JS libraries, plugins and custom scripts */}
  {/* Bootstrap JS */}
</div>



    </div>
  )
}
