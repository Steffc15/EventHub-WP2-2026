import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>Contact Us</h1>

        <p>
          Have questions, suggestions or feedback?
          We'd love to hear from you.
        </p>

        <div className="contact-info">
          <p>
            <strong>Email:</strong> support@eventhub.com
          </p>

          <p>
            <strong>Phone:</strong> +40 712 345 678
          </p>

          <p>
            <strong>Location:</strong> Bucharest, Romania
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;