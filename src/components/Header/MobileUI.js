import { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./MobileUI.module.scss";
const MobileUI = (props) => {
  const linkClass = (navData) =>
    navData.isActive ? `${classes.link} ${classes.active}` : classes.link;
  const hideMenu = () => {
    props.onHideMenu();
  };
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={hideMenu}></div>
      <nav className={classes["nav-mobile"]}>
        <Link className={classes["nav__logo"]} to="/" onClick={hideMenu}>
          LALA COLLECTION
        </Link>
        <ul>
          <li>
            <NavLink className={linkClass} to="/" onClick={hideMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={linkClass} to="/products" onClick={hideMenu}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink className={linkClass} to="/about" onClick={hideMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink className={linkClass} to="/contact" onClick={hideMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
export default MobileUI;
