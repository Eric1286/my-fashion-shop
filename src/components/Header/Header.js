import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import classes from "./Header.module.scss";
import LoginButton from "./LoginButton";
import { Fragment, useState } from "react";
import MobileUI from "./MobileUI";
import { useSelector } from "react-redux";
library.add(fas);
const Header = () => {
  const items = useSelector((state) => state.cart.items);

  const totalAmount = items
    .map((item) => item.amount)
    .reduce((el, num) => el + num, 0);

  const [showMenu, setShowMenu] = useState(false);
  const showMenuHandler = () => {
    setShowMenu(true);
  };
  const hideMenuHandler = () => {
    setShowMenu(false);
  };
  const linkClass = (navData) =>
    navData.isActive ? `${classes.link} ${classes.active}` : classes.link;
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.container}>
          <div>
            <FontAwesomeIcon
              className={classes.icon}
              icon="fa-solid fa-bars"
              onClick={showMenuHandler}
            />
            <Link className={classes["nav__logo"]} to="/">
              LALA COLLECTION
            </Link>
          </div>
          <nav className={classes.nav}>
            <ul>
              <li>
                <NavLink className={linkClass} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={linkClass} to="/products">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink className={linkClass} to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink className={linkClass} to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div>
            <LoginButton />
            <Link to="/cart" className="nav-button">
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
              <span> Cart ({totalAmount})</span>
            </Link>
          </div>
        </div>
      </header>
      {showMenu && <MobileUI onHideMenu={hideMenuHandler} />}
    </Fragment>
  );
};
export default Header;
