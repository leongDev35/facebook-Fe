import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar({user}) {
  return (
    <div className="col-lg-3">
          {/* Advanced filter responsive toggler START */}
          <div className="d-flex align-items-center d-lg-none">
            <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSideNavbar" aria-controls="offcanvasSideNavbar">
              <i className="btn btn-primary fw-bold fa-solid fa-sliders-h" />
              <span className="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
            </button>
          </div>
          {/* Advanced filter responsive toggler END */}
          {/* Navbar START*/}
          <nav className="navbar navbar-expand-lg mx-0"> 
            <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasSideNavbar">
              {/* Offcanvas header */}
              <div className="offcanvas-header">
                <button type="button" className="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" aria-label="Close" />
              </div>
              {/* Offcanvas body */}
              <div className="offcanvas-body d-block px-2 px-lg-0">
                {/* Card START */}
                <div className="card overflow-hidden">
                  {/* Cover image */}
                  <div className="h-50px" style={{backgroundImage: 'url(assets/images/bg/01.jpg)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}} />
                  {/* Card body START */}
                  <div className="card-body pt-0">
                    <div className="text-center">
                      {/* Avatar */}
                      <div className="avatar avatar-lg mt-n5 mb-3">
                        <a href="#!"><img className="avatar-img rounded border border-white border-3" src={user.avatarUrl} alt /></a>
                      </div>
                      {/* Info */}
                      <h5 className="mb-0"> <a href="#!"> {user.fullName} </a> </h5>
                      <small>Web Developer at Webestica</small>
                      <p className="mt-3">{user.bio}</p>
                      {/* User stat START */}
                      <div className="hstack gap-2 gap-xl-3 justify-content-center">
                        {/* User stat item */}
                        <div>
                          <h6 className="mb-0">256</h6>
                          <small>Post</small>
                        </div>
                        {/* Divider */}
                        <div className="vr" />
                        {/* User stat item */}
                        <div>
                          <h6 className="mb-0">2.5K</h6>
                          <small>Followers</small>
                        </div>
                        {/* Divider */}
                        <div className="vr" />
                        {/* User stat item */}
                        <div>
                          <h6 className="mb-0">365</h6>
                          <small>Following</small>
                        </div>
                      </div>
                      {/* User stat END */}
                    </div>
                    {/* Divider */}
                    <hr />
                    {/* Side Nav START */}
                    <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                      <li className="nav-item">
                        <a className="nav-link" href="my-profile.html"> <img className="me-2 h-20px fa-fw" src="assets/images/icon/home-outline-filled.svg" alt /><span>Feed </span></a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/network"> <img className="me-2 h-20px fa-fw" src="assets/images/icon/person-outline-filled.svg" alt /><span>Connections </span></Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="notifications.html"> <img className="me-2 h-20px fa-fw" src="assets/images/icon/notification-outlined-filled.svg" alt /><span>Notifications </span></a>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/setting"> <img className="me-2 h-20px fa-fw" src="assets/images/icon/cog-outline-filled.svg" alt /><span>Settings </span></Link>
                      </li>
                    </ul>
                    {/* Side Nav END */}
                  </div>
                  {/* Card body END */}
                  {/* Card footer */}
                  <div className="card-footer text-center py-2">
                    <Link className="btn btn-link btn-sm" to="/mypost">View Profile </Link>
                  </div>
                </div>
                {/* Card END */}
                {/* Helper link START */}
                <ul className="nav small mt-4 justify-content-center lh-1">
                  <li className="nav-item">
                    <a className="nav-link" href="my-profile-about.html">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="settings.html">Settings</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" target="_blank" href="https://support.webestica.com/login">Support </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" target="_blank" href="docs/index.html">Docs </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="help.html">Help</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="privacy-and-terms.html">Privacy &amp; terms</a>
                  </li>
                </ul>
                {/* Helper link END */}
                {/* Copyright */}
                <p className="small text-center mt-1">©2022 <a className="text-body" target="_blank" href="https://www.webestica.com/"> Webestica </a></p>
              </div>
            </div>
          </nav>
          {/* Navbar END*/}
        </div>
  )
}
