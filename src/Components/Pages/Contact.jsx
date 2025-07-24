import React from "react";

import subBanner1 from '/Images/mc-banner-1.png'

function Contact() {
  return (
    <div className="container py-5 mt-5">
      <h1 className="text-center fw-bold mb-4" style={{ fontSize: "2.5rem" }}>
        Contact us
      </h1>

      <ul className="mb-5" style={{ lineHeight: "2rem", fontSize: "1rem" }}>
        <li>
          <strong>WE LOVE TO HEAR FROM YOU & INTERACT WITH YOU.</strong>
        </li>
        
        <li>
          We’re here to listen, assist, and elevate your shopping experience to new heights.
        </li>
        <li>
          Need assistance or have any feedback, review, or ideas of inspiration to share? We’re just a message away.
        </li>
        
        <li>
          With MENSCO, every touchpoint is an opportunity to show our commitment to you.
        </li>
        <li>
          Join us on this journey, where your input shapes our innovation, and together, we step beyond the conventional to create something extraordinary.
        </li>
        <br />
        <ul className="fs-4 fw-semibold m-0 p-0" >
        <li>
          <span style={{color: '#4e7661'}}>WhatsApp at:</span> +91 18002022558
        </li>
        <li>
          <span style={{color: '#4e7661'}}>Email at:</span> mensco@example.com
        </li>
        </ul>
      </ul>

      <div className="row align-items-center g-5">
        
        <div className="col-md-6">
          <img
            src={subBanner1}
            alt="contact art"
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h3 className="fw-semibold mb-3">Contact <em>form</em></h3>
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="First name"
                  className="form-control rounded-3"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Last name"
                  className="form-control rounded-3"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="form-control rounded-3"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Phone"
                  className="form-control rounded-3"
                />
              </div>
              <div className="col-12">
                <textarea
                  rows="4"
                  placeholder="Comment"
                  className="form-control rounded-3"
                ></textarea>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-dark px-4 py-2 rounded-pill"
                >
                  ⬤ Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
