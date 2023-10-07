import React from 'react'

export default function Chat() {


  return (
    <>
    <div className="d-none d-lg-block">
    {/* Button */}
    <a className="icon-md btn btn-primary position-fixed end-0 bottom-0 me-5 mb-5" data-bs-toggle="offcanvas" href="#offcanvasChat" role="button" aria-controls="offcanvasChat">
      <i className="bi bi-chat-left-text-fill" />
    </a>
    {/* Chat sidebar START */}
    <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasChat">
      {/* Offcanvas header */}
      <div className="offcanvas-header d-flex justify-content-between">
        <h5 className="offcanvas-title">Messaging</h5>
        <div className="d-flex">
          {/* New chat box open button */}
          <a href="#" className="btn btn-secondary-soft-hover py-1 px-2">
            <i className="bi bi-pencil-square" />
          </a>
          {/* Chat action START */}
          <div className="dropdown">
            <a href="#" className="btn btn-secondary-soft-hover py-1 px-2" id="chatAction" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-three-dots" />
            </a>
            {/* Chat action menu */}
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="chatAction">
              <li><a className="dropdown-item" href="#"> <i className="bi bi-check-square fa-fw pe-2" />Mark all as read</a></li>
              <li><a className="dropdown-item" href="#"> <i className="bi bi-gear fa-fw pe-2" />Chat setting </a></li>
              <li><a className="dropdown-item" href="#"> <i className="bi bi-bell fa-fw pe-2" />Disable notifications</a></li>
              <li><a className="dropdown-item" href="#"> <i className="bi bi-volume-up-fill fa-fw pe-2" />Message sounds</a></li>
              <li><a className="dropdown-item" href="#"> <i className="bi bi-slash-circle fa-fw pe-2" />Block setting</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#"> <i className="bi bi-people fa-fw pe-2" />Create a group chat</a></li>
            </ul>
          </div>
          {/* Chat action END */}
          {/* Close  */}
          <a href="#" className="btn btn-secondary-soft-hover py-1 px-2" data-bs-dismiss="offcanvas" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </a>
        </div>
      </div>
      {/* Offcanvas body START */}
      <div className="offcanvas-body pt-0 custom-scrollbar">
        {/* Search contact START */}
        <form className="rounded position-relative">
          <input className="form-control ps-5 bg-light" type="search" placeholder="Search..." aria-label="Search" />
          <button className="btn bg-transparent px-3 py-0 position-absolute top-50 start-0 translate-middle-y" type="submit"><i className="bi bi-search fs-5"> </i></button>
        </form>
        {/* Search contact END */}
        <ul className="list-unstyled">
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative toast-btn" data-target="chatToast">
            {/* Avatar */}
            <div className="avatar status-online">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Frances Guerrero </a>
              <div className="small text-secondary text-truncate">Frances sent a photo.</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> Just now </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative toast-btn" data-target="chatToast2">
            {/* Avatar */}
            <div className="avatar status-online">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Lori Ferguson </a>
              <div className="small text-secondary text-truncate">You missed a call form Carolyn🤙</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 1min </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar status-offline">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/placeholder.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Samuel Bishop </a>
              <div className="small text-secondary text-truncate">Day sweetness why cordially 😊</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 2min </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Dennis Barrett </a>
              <div className="small text-secondary text-truncate">Happy birthday🎂</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 10min </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar avatar-story status-online">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Judy Nguyen </a>
              <div className="small text-secondary text-truncate">Thank you!</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 2hrs </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar status-online">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/06.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Carolyn Ortiz </a>
              <div className="small text-secondary text-truncate">Greetings from Webestica.</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 1 day </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="flex-shrink-0 avatar">
              <ul className="avatar-group avatar-group-four">
                <li className="avatar avatar-xxs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/06.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xxs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/07.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xxs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/08.jpg" alt="avatar" />
                </li>
                <li className="avatar avatar-xxs">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/09.jpg" alt="avatar" />
                </li>
              </ul>
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link text-truncate d-inline-block" href="#!">Frances, Lori, Amanda, Lawson </a>
              <div className="small text-secondary text-truncate">Btw are you looking for job change?</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 4 day </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar status-offline">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/08.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Bryan Knight </a>
              <div className="small text-secondary text-truncate">if you are available to discuss🙄</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 6 day </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/09.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Louis Crawford </a>
              <div className="small text-secondary text-truncate">🙌Congrats on your work anniversary!</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 1 day </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar status-online">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/10.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Jacqueline Miller </a>
              <div className="small text-secondary text-truncate">No sorry, Thanks.</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 15, dec </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/11.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Amanda Reed </a>
              <div className="small text-secondary text-truncate">Interested can share CV at.</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 18, dec </div>
          </li>
          {/* Contact item */}
          <li className="mt-3 hstack gap-3 align-items-center position-relative">
            {/* Avatar */}
            <div className="avatar status-online">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/12.jpg" alt />
            </div>
            {/* Info */}
            <div className="overflow-hidden">
              <a className="h6 mb-0 stretched-link" href="#!">Larry Lawson </a>
              <div className="small text-secondary text-truncate">Hope you're doing well and Safe.</div>
            </div>
            {/* Chat time */}
            <div className="small ms-auto text-nowrap"> 20, dec </div>
          </li>
          {/* Button */}
          <li className="mt-3 d-grid">
            <a className="btn btn-primary-soft" href="messaging.html"> See all in messaging </a>
          </li>
        </ul>
      </div>
      {/* Offcanvas body END */}
    </div>
    {/* Chat sidebar END */}
    {/* Chat END */}
    {/* Chat START */}
    <div aria-live="polite" aria-atomic="true" className="position-relative">
      <div className="toast-container toast-chat d-flex gap-3 align-items-end">
        {/* Chat toast START */}
        <div id="chatToast" className="toast mb-0 bg-mode" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
          <div className="toast-header bg-mode">
            {/* Top avatar and status START */}
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="d-flex">
                <div className="flex-shrink-0 avatar me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0 mt-1">Frances Guerrero</h6>
                  <div className="small text-secondary"><i className="fa-solid fa-circle text-success me-1" />Online</div>
                </div>
              </div>
              <div className="d-flex">
                {/* Call button */}
                <div className="dropdown">
                  <a className="btn btn-secondary-soft-hover py-1 px-2" href="#" id="chatcoversationDropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></a>               
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="chatcoversationDropdown">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-camera-video me-2 fw-icon" />Video call</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-telephone me-2 fw-icon" />Audio call</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-trash me-2 fw-icon" />Delete </a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-chat-square-text me-2 fw-icon" />Mark as unread</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-volume-up me-2 fw-icon" />Muted</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-archive me-2 fw-icon" />Archive</a></li>
                    <li className="dropdown-divider" />
                    <li><a className="dropdown-item" href="#"><i className="bi bi-flag me-2 fw-icon" />Report</a></li>
                  </ul>
                </div>
                {/* Card action END */}
                <a className="btn btn-secondary-soft-hover py-1 px-2" data-bs-toggle="collapse" href="#collapseChat" aria-expanded="false" aria-controls="collapseChat"><i className="bi bi-dash-lg" /></a>        
                <button className="btn btn-secondary-soft-hover py-1 px-2" data-bs-dismiss="toast" aria-label="Close"><i className="fa-solid fa-xmark" /></button>
              </div>
            </div>
            {/* Top avatar and status END */}
          </div>
          <div className="toast-body collapse show" id="collapseChat">
            {/* Chat conversation START */}
            <div className="chat-conversation-content custom-scrollbar h-200px">
              {/* Chat time */}
              <div className="text-center small my-2">Jul 16, 2022, 06:15 am</div>
              {/* Chat message left */}
              <div className="d-flex mb-1">
                <div className="flex-shrink-0 avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt />
                </div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div className="bg-light text-secondary p-2 px-3 rounded-2">Applauded no discovery😊</div>
                      <div className="small my-2">6:15 AM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat message right */}
              <div className="d-flex justify-content-end text-end mb-1">
                <div className="w-100">
                  <div className="d-flex flex-column align-items-end">
                    <div className="bg-primary text-white p-2 px-3 rounded-2">With pleasure</div>
                  </div>
                </div>
              </div>
              {/* Chat message left */}
              <div className="d-flex mb-1">
                <div className="flex-shrink-0 avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt />
                </div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div className="bg-light text-secondary p-2 px-3 rounded-2">Please find the attached</div>
                      {/* Files START */}
                      {/* Files END */}
                      <div className="small my-2">12:16 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat message left */}
              <div className="d-flex mb-1">
                <div className="flex-shrink-0 avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt />
                </div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div className="bg-light text-secondary p-2 px-3 rounded-2">How promotion excellent curiosity😮</div>
                      <div className="small my-2">3:22 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat message right */}
              <div className="d-flex justify-content-end text-end mb-1">
                <div className="w-100">
                  <div className="d-flex flex-column align-items-end">
                    <div className="bg-primary text-white p-2 px-3 rounded-2">And sir dare view.</div>
                    {/* Images */}
                    <div className="d-flex my-2">
                      <div className="small text-secondary">5:35 PM</div>
                      <div className="small ms-2"><i className="fa-solid fa-check" /></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat time */}
              <div className="text-center small my-2">2 New Messages</div>
              {/* Chat Typing */}
              <div className="d-flex mb-1">
                <div className="flex-shrink-0 avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt />
                </div>
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
            </div>
            {/* Chat conversation END */}
            {/* Chat bottom START */}
            <div className="mt-2">
              {/* Chat textarea */}
              <textarea className="form-control mb-sm-0 mb-3" placeholder="Type a message" rows={1} defaultValue={""} />
              {/* Button */}
              <div className="d-sm-flex align-items-end mt-2">
                <button className="btn btn-sm btn-danger-soft me-2"><i className="fa-solid fa-face-smile fs-6" /></button>
                <button className="btn btn-sm btn-secondary-soft me-2"><i className="fa-solid fa-paperclip fs-6" /></button>
                <button className="btn btn-sm btn-success-soft me-2"> Gif </button>
                <button className="btn btn-sm btn-primary ms-auto"> Send </button>
              </div>
            </div>
            {/* Chat bottom START */}
          </div>
        </div>
        {/* Chat toast END */}
        {/* Chat toast 2 START */}
        <div id="chatToast2" className="toast mb-0 bg-mode" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
          <div className="toast-header bg-mode">
            {/* Top avatar and status START */}
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="d-flex">
                <div className="flex-shrink-0 avatar me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0 mt-1">Lori Ferguson</h6>
                  <div className="small text-secondary"><i className="fa-solid fa-circle text-success me-1" />Online</div>
                </div>
              </div>
              <div className="d-flex">
                {/* Call button */}
                <div className="dropdown">
                  <a className="btn btn-secondary-soft-hover py-1 px-2" href="#" id="chatcoversationDropdown2" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></a>               
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="chatcoversationDropdown2">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-camera-video me-2 fw-icon" />Video call</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-telephone me-2 fw-icon" />Audio call</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-trash me-2 fw-icon" />Delete </a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-chat-square-text me-2 fw-icon" />Mark as unread</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-volume-up me-2 fw-icon" />Muted</a></li>
                    <li><a className="dropdown-item" href="#"><i className="bi bi-archive me-2 fw-icon" />Archive</a></li>
                    <li className="dropdown-divider" />
                    <li><a className="dropdown-item" href="#"><i className="bi bi-flag me-2 fw-icon" />Report</a></li>
                  </ul>
                </div>
                {/* Card action END */}
                <a className="btn btn-secondary-soft-hover py-1 px-2" data-bs-toggle="collapse" href="#collapseChat2" role="button" aria-expanded="false" aria-controls="collapseChat2"><i className="bi bi-dash-lg" /></a>        
                <button className="btn btn-secondary-soft-hover py-1 px-2" data-bs-dismiss="toast" aria-label="Close"><i className="fa-solid fa-xmark" /></button>
              </div>
            </div>
            {/* Top avatar and status END */}
          </div>
          <div className="toast-body collapse show" id="collapseChat2">
            {/* Chat conversation START */}
            <div className="chat-conversation-content custom-scrollbar h-200px">
              {/* Chat time */}
              <div className="text-center small my-2">Jul 16, 2022, 06:15 am</div>
              {/* Chat message left */}
              <div className="d-flex mb-1">
                <div className="flex-shrink-0 avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt />
                </div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div className="bg-light text-secondary p-2 px-3 rounded-2">Applauded no discovery😊</div>
                      <div className="small my-2">6:15 AM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat message right */}
              <div className="d-flex justify-content-end text-end mb-1">
                <div className="w-100">
                  <div className="d-flex flex-column align-items-end">
                    <div className="bg-primary text-white p-2 px-3 rounded-2">With pleasure</div>
                  </div>
                </div>
              </div>
              {/* Chat message left */}
              <div className="d-flex mb-1">
                <div className="flex-shrink-0 avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt />
                </div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div className="bg-light text-secondary p-2 px-3 rounded-2">Please find the attached</div>
                      {/* Files START */}
                      {/* Files END */}
                      <div className="small my-2">12:16 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat message left */}
              <div className="d-flex mb-1">
                <div className="flex-shrink-0 avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt />
                </div>
                <div className="flex-grow-1">
                  <div className="w-100">
                    <div className="d-flex flex-column align-items-start">
                      <div className="bg-light text-secondary p-2 px-3 rounded-2">How promotion excellent curiosity😮</div>
                      <div className="small my-2">3:22 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat message right */}
              <div className="d-flex justify-content-end text-end mb-1">
                <div className="w-100">
                  <div className="d-flex flex-column align-items-end">
                    <div className="bg-primary text-white p-2 px-3 rounded-2">And sir dare view.</div>
                    {/* Images */}
                    <div className="d-flex my-2">
                      <div className="small text-secondary">5:35 PM</div>
                      <div className="small ms-2"><i className="fa-solid fa-check" /></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Chat time */}
              <div className="text-center small my-2">2 New Messages</div>
              {/* Chat Typing */}
              <div className="d-flex mb-1">
                <div className="flex-shrink-0 avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt />
                </div>
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
            </div>
            {/* Chat conversation END */}
            {/* Chat bottom START */}
            <div className="mt-2">
              {/* Chat textarea */}
              <textarea className="form-control mb-sm-0 mb-3" placeholder="Type a message" rows={1} defaultValue={""} />
              {/* Button */}
              <div className="d-sm-flex align-items-end mt-2">
                <button className="btn btn-sm btn-danger-soft me-2"><i className="fa-solid fa-face-smile fs-6" /></button>
                <button className="btn btn-sm btn-secondary-soft me-2"><i className="fa-solid fa-paperclip fs-6" /></button>
                <button className="btn btn-sm btn-success-soft me-2"> Gif </button>
                <button className="btn btn-sm btn-primary ms-auto"> Send </button>
              </div>
            </div>
            {/* Chat bottom START */}
          </div>
        </div>
        {/* Chat toast 2 END */}
      </div>
    </div>
    {/* Chat END */}
  </div>
    </>
  )
}
