import React from 'react'

export default function 
() {
  return (
    <>
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
          <div className="d-flex mb-3">
            {/* Avatar */}
            <div className="avatar avatar-xs me-2">
              <img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt />
            </div>
            {/* Feed box  */}
            <form className="w-100">
              <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows={4} placeholder="Share your thoughts..." autofocus defaultValue={""} />
            </form>
          </div>
          {/* Feed rect START */}
          <div className="hstack gap-2">
            <a className="icon-md bg-success bg-opacity-10 text-success rounded-circle" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Photo"> <i className="bi bi-image-fill" /> </a>
            <a className="icon-md bg-info bg-opacity-10 text-info rounded-circle" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Video"> <i className="bi bi-camera-reels-fill" /> </a>
            <a className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Events"> <i className="bi bi-calendar2-event-fill" /> </a>
            <a className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Feeling/Activity"> <i className="bi bi-emoji-smile-fill" /> </a>
            <a className="icon-md bg-light text-secondary rounded-circle" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Check in"> <i className="bi bi-geo-alt-fill" /> </a>
            <a className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Tag people on top"> <i className="bi bi-tag-fill" /> </a>
          </div>
          {/* Feed rect END */}
        </div>
        {/* Modal feed body END */}
        {/* Modal feed footer */}
        <div className="modal-footer row justify-content-between">
          {/* Select */}
          <div className="col-lg-3">
            <select className="form-select js-choice choice-select-text-none" data-position="top" data-search-enabled="false">
              <option value="PB">Public</option>
              <option value="PV">Friends</option>
              <option value="PV">Only me</option>
              <option value="PV">Custom</option>
            </select>
            {/* Button */}
          </div>
          <div className="col-lg-8 text-sm-end">
            <button type="button" className="btn btn-danger-soft me-2"> <i className="bi bi-camera-video-fill pe-1" /> Live video</button>
            <button type="button" className="btn btn-success-soft">Post</button>
          </div>
        </div>
        {/* Modal feed footer */}
      </div>
    </div>
  </div> 
    </>
  )
}
