import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="terms-card">
        <h1>Terms & Conditions</h1>

        <p>
          By using EventHub, you agree to follow the platform rules
          and respect all users and event organizers.
        </p>

        <p>
          Reservations are subject to seat availability and may be
          cancelled according to the event policies.
        </p>

        <p>
          Users are responsible for maintaining the confidentiality
          of their account credentials.
        </p>

        <p>
          EventHub reserves the right to modify events, availability
          and platform features at any time.
        </p>

        <p>
          By continuing to use the application, you accept these terms.
        </p>
      </div>
    </div>
  );
};

export default Terms;