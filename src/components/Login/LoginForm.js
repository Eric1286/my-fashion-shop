import { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { authAction, cartAction } from "../../store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const validateForm = () => {
    const msg = {};
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.trim() === "") {
      msg.emailInput = "*Please enter your email";
    } else if (!email.match(mailformat)) {
      msg.emailInput = "*Please enter a valid email address";
    }
    if (password.trim() === "") {
      msg.passwordInput = "*Please enter your password";
    } else if (password.trim().length < 8) {
      msg.passwordInput = "*Please enter at least 8 characters";
    }
    setErrorMsg(msg);
    if (Object.keys(msg).length > 0) {
      return false;
    } else return true;
  };
  const submitLoginFormHandler = (event) => {
    event.preventDefault();
    const formIsValid = validateForm();
    if (!formIsValid) return;
    const signinHandlerFn = async () => {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7mNCfEzs7oh9Jr9QIpk2XHc796oTFu1Y",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        const content = await response.json();
        enqueueSnackbar(content.error.message, { variant: "error" });
        await content.error.message;

        setEmail("");
        setPassword("");
        return;
      }
      const data = await response.json();

      dispatch(authAction.loginHandler(data.idToken));
      const responseData = await fetch(
        "https://react-http-9e6b9-default-rtdb.firebaseio.com/myCart.json"
      );
      const userData = await responseData.json();
      let arr = [];
      for (const key in userData) {
        arr.push({ id: key, ...userData[key] });
      }
      const selectedElement = arr.filter((el) => el.email === email);
      selectedElement[0].items.splice(0, 1);
      dispatch(cartAction.updateCart(selectedElement[0]));
      localStorage.setItem(
        "userAccount",
        JSON.stringify({ isLogin: true, showLoginForm: true })
      );
      localStorage.setItem("userCart", JSON.stringify(selectedElement[0]));
      navigate("/");
    };
    signinHandlerFn();
  };

  return (
    <form onSubmit={submitLoginFormHandler}>
      <h3 className="form__title">Login</h3>
      <div className="mg">
        <label className="form__label">Your email</label>
        <input
          className="form__input"
          type="text"
          placeholder="Enter your username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <p className="form__errorMsg">{errorMsg.emailInput}</p>
      </div>
      <div className="mg">
        <label className="form__label">Password</label>
        <input
          className="form__input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <p className="form__errorMsg">{errorMsg.passwordInput}</p>
      </div>
      <button type="submit" className="form__submit__btn">
        Sign in
      </button>
    </form>
  );
};
export default LoginForm;
