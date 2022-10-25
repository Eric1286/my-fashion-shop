import { fas } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import classes from "./Contact.module.scss";
const Contact = () => {
  const nameInputRef = useRef("");
  const emailInputRef = useRef("");
  const msgInputRef = useRef("");
  const [errMessage, setErrMessage] = useState("");

  const validateForm = () => {
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const message = msgInputRef.current.value;
    let msg = {};
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name.trim().length === 0) {
      msg.nameInput = "*Please enter your name";
      nameInputRef.current.focus();
    } else if (name.trim().split(" ").length < 2) {
      msg.nameInput = "*Please enter your full name (both first and last)";
    }
    if (email.trim().length === 0) {
      msg.emailInput = "*Please enter your email";
    } else if (!email.match(mailformat)) {
      msg.emailInput = "*Please enter a valid email address";
    }
    if (message.trim().length === 0) {
      msg.messageInput = "*Please share something";
    }
    setErrMessage(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else return true;
  };
  const submitHandler = (event) => {
    event.preventDefault();
    validateForm();
  };
  return (
    <main className={classes.contact}>
      <div className={classes["contact__bgr"]}></div>
      <div className={classes.container}>
        <div className={classes["contact__message"]}>
          <h3>Get In Touch</h3>
          <form onSubmit={submitHandler}>
            <div className="mg">
              <label className="form__label" htmlFor="name">
                Your full name
              </label>
              <input className="form__input" type="text" ref={nameInputRef} />

              <p className="form__errorMsg">{errMessage.nameInput}</p>
            </div>
            <div className="mg">
              <label className="form__label" htmlFor="email">
                Your email
              </label>
              <input className="form__input" type="text" ref={emailInputRef} />

              <p className="form__errorMsg">{errMessage.emailInput}</p>
            </div>
            <div className="mg">
              <label className="form__label" htmlFor="message">
                Message
              </label>
              <textarea className="form__input" type="text" ref={msgInputRef} />
              <p className="form__errorMsg">{errMessage.messageInput}</p>
            </div>
            <button type="submit" className="form__submit__btn">
              Send
            </button>
          </form>
        </div>
        <div className={classes["contact__address"]}>
          <div className={classes["contact__city"]}>
            <h3>New York</h3>
            <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
          </div>
          <div className={classes["contact__city"]}>
            <h3>Lon Don</h3>
            <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
          </div>
          <div className={classes["contact__city"]}>
            <h3>Canada</h3>
            <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Contact;
