import { useDispatch } from "react-redux";
import { authAction, cartAction } from "../../store";
import classes from "./UserAccount.module.scss";
const UserAccount = () => {
  const dispatch = useDispatch();

  const logoutClickHandler = () => {
    dispatch(authAction.logoutHandler());
    dispatch(cartAction.clearCart());
    localStorage.removeItem("userAccount");
    localStorage.removeItem("userCart");
  };
  return (
    <form className={classes["account__info"]}>
      <ul className={classes["account__list"]}>
        <li>
          <a href="#">My account</a>
        </li>
        <li>
          <a href="#">My order</a>
        </li>
        <li>
          <a href="#">My wishList</a>
        </li>
      </ul>
      <p className={classes["account__logout"]} onClick={logoutClickHandler}>
        Logout
      </p>
    </form>
  );
};
export default UserAccount;
