import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "./LoginForm";
import classes from "./LoginModal.module.scss";

library.add(fas);
const LoginModal = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes["form__wrap"]}>
        <FontAwesomeIcon
          onClick={props.onHideLoginForm}
          className={classes["login__closeicon"]}
          icon="fa-solid fa-xmark"
        />
        <LoginForm />
        <p className={classes["form__question"]}>
          Not a member yet?{" "}
          <NavLink
            className={classes.link}
            to="/register"
            onClick={props.onHideLoginForm}
          >
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};
export default LoginModal;
