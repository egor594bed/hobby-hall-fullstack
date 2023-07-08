import React from "react";

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <a className="contact-info__text" href="mailto:info@hobbyhallshop.ru">
        E-mail: info@hobbyhallshop.ru
      </a>
      <p className="contact-info__text">г.Киров, Октябрьский пр-т, 74</p>
      <p className="contact-info__text-wrapper">
        тел.
        <a className="contact-info__text" href="tel: 88332470183">
          {" "}
          8(8332)470183,{" "}
        </a>
        <a className="contact-info__text" href="tel: +79128270183">
          +79128270183
        </a>
      </p>
    </div>
  );
};

export default ContactInfo;
