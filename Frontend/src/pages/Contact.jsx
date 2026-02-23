import React from "react";

const Contact = () => (
  <div style={{ padding: "40px" }}>
    <h2>Contact Us</h2>
    <p>
      Have questions or need support? Reach out to our team!
    </p>
    <ul>
      <li>Email: support@realestatehub.com</li>
      <li>Phone: +91 98765 43210</li>
      <li>Address: 123 Main Street, Mumbai, India</li>
    </ul>
    <form style={{ marginTop: "20px" }}>
      <label>Name:<br /><input type="text" name="name" /></label><br />
      <label>Email:<br /><input type="email" name="email" /></label><br />
      <label>Message:<br /><textarea name="message" rows={4} /></label><br />
      <button type="submit">Send</button>
    </form>
  </div>
);

export default Contact;
