import React from 'react'

export default function FeedPhoto({ posts, setPosts }) {



  return (
    <>
    <div className="modal fade" id="feedActionPhoto" tabIndex={-1} aria-labelledby="feedActionPhotoLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        {/* Modal feed header START */}
        <div className="modal-header">
          <h5 className="modal-title" id="feedActionPhotoLabel">Add post</h5>
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
            <label className="form-label">Upload attachment
            <input id='filepicker'
                                        multiple  //: chọn nhiều file
                                        type="file" style={{ display: 'none' }} /></label>
            <div className="dropzone dropzone-default card shadow-none" data-dropzone="{&quot;maxFiles&quot;:2}">
            
              <div className="dz-message">
                <i className="bi bi-images display-3" />
                <p>Click to upload photo.</p>
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
    </>
  )
}
