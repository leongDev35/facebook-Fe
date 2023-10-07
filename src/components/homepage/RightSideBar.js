import React from 'react'

export default function RightSideBar() {
  return (
    <>

<div className="col-lg-3">
          <div className="row g-4">
            {/* Card follow START */}
            <div className="col-sm-6 col-lg-12">
              <div className="card">
                {/* Card header START */}
                <div className="card-header pb-0 border-0">
                  <h5 className="card-title mb-0">Who to follow</h5>
                </div>
                {/* Card header END */}
                {/* Card body START */}
                <div className="card-body">
                  {/* Connection item START */}
                  <div className="hstack gap-2 mb-3">
                    {/* Avatar */}
                    <div className="avatar">
                      <a href="#!"><img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt /></a>
                    </div>
                    {/* Title */}
                    <div className="overflow-hidden">
                      <a className="h6 mb-0" href="#!">Judy Nguyen </a>
                      <p className="mb-0 small text-truncate">News anchor</p>
                    </div>
                    {/* Button */}
                    <a className="btn btn-primary-soft rounded-circle icon-md ms-auto" href="#"><i className="fa-solid fa-plus"> </i></a>
                  </div>
                  {/* Connection item END */}
                  {/* Connection item START */}
                  <div className="hstack gap-2 mb-3">
                    {/* Avatar */}
                    <div className="avatar avatar-story">
                      <a href="#!"> <img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt /> </a>
                    </div>
                    {/* Title */}
                    <div className="overflow-hidden">
                      <a className="h6 mb-0" href="#!">Amanda Reed </a>
                      <p className="mb-0 small text-truncate">Web Developer</p>
                    </div>
                    {/* Button */}
                    <a className="btn btn-primary-soft rounded-circle icon-md ms-auto" href="#"><i className="fa-solid fa-plus"> </i></a>
                  </div>
                  {/* Connection item END */}
                  {/* Connection item START */}
                  <div className="hstack gap-2 mb-3">
                    {/* Avatar */}
                    <div className="avatar">
                      <a href="#"> <img className="avatar-img rounded-circle" src="assets/images/avatar/11.jpg" alt /> </a>
                    </div>
                    {/* Title */}
                    <div className="overflow-hidden">
                      <a className="h6 mb-0" href="#!">Billy Vasquez </a>
                      <p className="mb-0 small text-truncate">News anchor</p>
                    </div>
                    {/* Button */}
                    <a className="btn btn-primary rounded-circle icon-md ms-auto" href="#"><i className="bi bi-person-check-fill"> </i></a>
                  </div>
                  {/* Connection item END */}
                  {/* Connection item START */}
                  <div className="hstack gap-2 mb-3">
                    {/* Avatar */}
                    <div className="avatar">
                      <a href="#"> <img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt /> </a>
                    </div>
                    {/* Title */}
                    <div className="overflow-hidden">
                      <a className="h6 mb-0" href="#!">Lori Ferguson </a>
                      <p className="mb-0 small text-truncate">Web Developer at Webestica</p>
                    </div>
                    {/* Button */}
                    <a className="btn btn-primary-soft rounded-circle icon-md ms-auto" href="#"><i className="fa-solid fa-plus"> </i></a>
                  </div>
                  {/* Connection item END */}
                  {/* Connection item START */}
                  <div className="hstack gap-2 mb-3">
                    {/* Avatar */}
                    <div className="avatar">
                      <a href="#"> <img className="avatar-img rounded-circle" src="assets/images/avatar/placeholder.jpg" alt /> </a>
                    </div>
                    {/* Title */}
                    <div className="overflow-hidden">
                      <a className="h6 mb-0" href="#!">Carolyn Ortiz </a>
                      <p className="mb-0 small text-truncate">News anchor</p>
                    </div>
                    {/* Button */}
                    <a className="btn btn-primary-soft rounded-circle icon-md ms-auto" href="#"><i className="fa-solid fa-plus"> </i></a>
                  </div>
                  {/* Connection item END */}
                  {/* View more button */}
                  <div className="d-grid mt-3">
                    <a className="btn btn-sm btn-primary-soft" href="#!">View more</a>
                  </div>
                </div>
                {/* Card body END */}
              </div>
            </div>
            {/* Card follow START */}
            {/* Card News START */}
            <div className="col-sm-6 col-lg-12">
              <div className="card">
                {/* Card header START */}
                <div className="card-header pb-0 border-0">
                  <h5 className="card-title mb-0">Today’s news</h5>
                </div>
                {/* Card header END */}
                {/* Card body START */}
                <div className="card-body">
                  {/* News item */}
                  <div className="mb-3">
                    <h6 className="mb-0"><a href="blog-details.html">Ten questions you should answer truthfully</a></h6>
                    <small>2hr</small>
                  </div>
                  {/* News item */}
                  <div className="mb-3">
                    <h6 className="mb-0"><a href="blog-details.html">Five unbelievable facts about money</a></h6>
                    <small>3hr</small>
                  </div>
                  {/* News item */}
                  <div className="mb-3">
                    <h6 className="mb-0"><a href="blog-details.html">Best Pinterest Boards for learning about business</a></h6>
                    <small>4hr</small>
                  </div>
                  {/* News item */}
                  <div className="mb-3">
                    <h6 className="mb-0"><a href="blog-details.html">Skills that you can learn from business</a></h6>
                    <small>6hr</small>
                  </div>
                  {/* Load more comments */}
                  <a href="#!" role="button" className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center" data-bs-toggle="button" aria-pressed="true">
                    <div className="spinner-dots me-2">
                      <span className="spinner-dot" />
                      <span className="spinner-dot" />
                      <span className="spinner-dot" />
                    </div>
                    View all latest news
                  </a>
                </div>
                {/* Card body END */}
              </div>
            </div>
            {/* Card News END */}
          </div>
        </div>
    </>
  )
}
