import React from 'react';

function Contact() {
  return (
    <section className="contact-section py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Keep in Touch With Us</h2>
        <p className="text-center text-muted mb-5">
          Be the first to know about new skincare launches, exclusive offers, and expert beauty tips.
        </p>

        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="border rounded p-4 bg-white shadow-sm">
              <h5 className="fw-semibold mb-3">Contact Information</h5>
              <p className="mb-2"><strong>Mobile:</strong> +91 88665 54411</p>
              <p className="mb-2"><strong>Hotline:</strong> 1800 123 4567</p>
              <p className="mb-0"><strong>Email:</strong> hello@example.com</p>
            </div>
          </div>
        </div>

        {/* Optional: Contact form */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className="p-4 bg-white border rounded shadow-sm">
              <h5 className="fw-semibold mb-4">Send us a message</h5>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" placeholder="Write your message..."></textarea>
              </div>
              <button type="submit" className="btn btn-dark px-4">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
