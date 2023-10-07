import React from 'react'

export default function NavBar({user}) {
  

  return (
    <>
      {/*Header START */}
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
                  <a className="nav-link active dropdown-toggle" href="#" id="homeMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Demo</a>
                  <ul className="dropdown-menu" aria-labelledby="homeMenu">
                    <li> <a className="dropdown-item active" href="index-2.html">Home default</a></li>
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
