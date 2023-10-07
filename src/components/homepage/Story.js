//! Fix sau


import React from 'react'


export default function Story() {
  return (
    <div>
        
        {/* Story START */}
        <div className="tiny-slider arrow-hover overflow-hidden">
            <div className="tiny-slider-inner ms-n4" data-arrow="true" data-dots="true" data-loop="false" data-autoplay="false" data-items-xl={4} data-items-lg={3} data-items-md={3} data-items-sm={3} data-items-xs={2} data-gutter={12} data-edge={30}>
              {/* Slider items */}
              <div>
                {/* Card add story START */}
                <div className="card border border-2 border-dashed h-150px shadow-none d-flex align-items-center justify-content-center text-center">
                  <div>
                    <a className="stretched-link btn btn-light rounded-circle icon-md" href="#!"><i className="fa-solid fa-plus" /></a>
                    <h6 className="mt-2 mb-0 small">Post a Story</h6>
                  </div>
                </div>
                {/* Card add story END */}
              </div>
              {/* Slider items */}
              <div>
                {/* Card START */}
                <div className="card card-overlay-bottom border-0 position-relative h-150px" style={{backgroundImage: 'url(assets/images/post/1by1/02.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover'}}>
                  <div className="card-img-overlay d-flex align-items-center p-2">
                    <div className="w-100 mt-auto">
                      {/* Name */}
                      <a href="#!" className="stretched-link text-white small">Judy Nguyen</a>
                    </div>
                  </div>
                </div>
                {/* Card END */}
              </div>
              {/* Slider items */}
              <div>
                {/* Card START */}
                <div className="card card-overlay-bottom border-0 position-relative h-150px" style={{backgroundImage: 'url(assets/images/post/1by1/03.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover'}}>
                  <div className="card-img-overlay d-flex align-items-center p-2">
                    <div className="w-100 mt-auto">
                      {/* Name */}
                      <a href="#!" className="stretched-link text-white small">Samuel Bishop</a>
                    </div>
                  </div>
                </div>
                {/* Card END */}
              </div>
              {/* Slider items */}
              <div>
                {/* Card START */}
                <div className="card card-overlay-bottom border-0 position-relative h-150px" style={{backgroundImage: 'url(assets/images/post/1by1/04.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover'}}>
                  <div className="card-img-overlay d-flex align-items-center p-2">
                    <div className="w-100 mt-auto">
                      {/* Name */}
                      <a href="#!" className="stretched-link text-white small">Carolyn Ortiz</a>
                    </div>
                  </div>
                </div>
                {/* Card END */}
              </div>
              {/* Slider items */}
              <div>
                {/* Card START */}
                <div className="card card-overlay-bottom border-0 position-relative h-150px" style={{backgroundImage: 'url(assets/images/post/1by1/05.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover'}}>
                  <div className="card-img-overlay d-flex align-items-center p-2">
                    <div className="w-100 mt-auto">
                      {/* Name */}
                      <a href="#!" className="stretched-link text-white small">Amanda Reed</a>
                    </div>
                  </div>
                </div>
                {/* Card END */}
              </div>
              {/* Slider items */}
              <div>
                {/* Card START */}
                <div className="card card-overlay-bottom border-0 position-relative h-150px" style={{backgroundImage: 'url(assets/images/post/1by1/01.jpg)', backgroundPosition: 'center left', backgroundSize: 'cover'}}>
                  <div className="card-img-overlay d-flex align-items-center p-2">
                    <div className="w-100 mt-auto">
                      {/* Name */}
                      <a href="#!" className="stretched-link text-white small">Lori Stevens</a>
                    </div>
                  </div>
                </div>
                {/* Card END */}
              </div>
            </div>
          </div>
          {/* Story END */}
    </div>
  )
}
