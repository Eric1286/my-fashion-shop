import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import classes from "./RegisterForm.module.scss";
import { useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { authAction } from "../../store";
library.add(fas);
const Register = () => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const cfPasswordInputRef = useRef();
  const [errMessage, setErrMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const validateForm = () => {
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const cfPassword = cfPasswordInputRef.current.value;
    let msg = {};
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name.trim().length === 0) {
      msg.namePrompt = "*Please enter your username";
    } else if (name.trim().split(" ").length < 2) {
      msg.namePrompt = "*Please enter your full name (both first and last)";
    }

    if (email.trim().length === 0) {
      msg.emailPrompt = "*Please enter your email";
    } else if (!email.match(mailformat)) {
      msg.emailPrompt = "*Please enter a valid email address";
    }
    if (password.trim().length === 0) {
      msg.passwordPrompt = "*Please enter password";
    } else if (password.trim().length < 8) {
      msg.passwordPrompt = "*Please enter at least 8 characters";
    }
    if (cfPassword.trim().length === 0) {
      msg.cfPasswordPrompt = "*Please enter confirmed password";
    } else if (cfPassword.trim() !== password.trim()) {
      msg.cfPasswordPrompt = "Please try again!";
    }
    setErrMessage(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else return true;
  };

  const submitRegisterFormHandler = (event) => {
    event.preventDefault();
    const formIsValid = validateForm();
    if (!formIsValid) return;
    const signupAccountFn = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7mNCfEzs7oh9Jr9QIpk2XHc796oTFu1Y",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailInputRef.current.value,
              password: passwordInputRef.current.value,
              returnSecureToken: true,
            }),
          }
        );

        if (!response.ok) {
          const content = await response.json();
          enqueueSnackbar(content.error.message, { variant: "error" });
          alert(content.error.message);
          return;
        }
        // send data to database
        dispatch(authAction.registerHandler());
        await fetch(
          `https://react-http-9e6b9-default-rtdb.firebaseio.com/myCart.json`,
          {
            method: "POST",
            body: JSON.stringify({
              email: emailInputRef.current.value,
              name: nameInputRef.current.value,
              items: [0],
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        enqueueSnackbar("Your account is registered successfully!", {
          variant: "success",
        });
      } catch (err) {}
    };
    signupAccountFn();
  };

  return (
    <form className={classes.form} onSubmit={submitRegisterFormHandler}>
      <div className={classes["icon__container"]}>
        <FontAwesomeIcon
          className={classes.icon}
          icon="fa-solid fa-circle-user"
        />
      </div>
      <div className="mg">
        <label className="form__label">Your name</label>
        <input
          className="form__input"
          type="text"
          placeholder="Enter your name"
          ref={nameInputRef}
        />
        <p className="form__errorMsg">{errMessage.namePrompt}</p>
      </div>
      <div className="mg">
        <label className="form__label">Your email</label>
        <input
          className="form__input"
          type="text"
          placeholder="Enter email"
          ref={emailInputRef}
        />

        <p className="form__errorMsg">{errMessage.emailPrompt}</p>
      </div>
      <div className="mg">
        <label className="form__label">Password</label>
        <input
          className="form__input"
          type="password"
          placeholder="Enter password"
          ref={passwordInputRef}
        />

        <p className="form__errorMsg">{errMessage.passwordPrompt}</p>
      </div>
      <div className="mg">
        <label className="form__label">Confirm password</label>
        <input
          className="form__input"
          type="password"
          placeholder="Enter password"
          ref={cfPasswordInputRef}
        />

        <p className="form__errorMsg">{errMessage.cfPasswordPrompt}</p>
      </div>
      <button type="submit" className="form__submit__btn">
        Create my account
      </button>
    </form>
  );
};
export default Register;
