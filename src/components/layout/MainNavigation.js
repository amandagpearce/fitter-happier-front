import classes from "./MainNavigation.module.css";
import Link from "next/link";
import { Bowlby_One } from "next/font/google";

const logoFont = Bowlby_One({ subsets: ["latin"], weight: "400" });

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={`${classes.container} container`}>
        <Link
          className={`${classes.logo} ${logoFont.className} navbar-brand`}
          href="/"
        >
          <p>Fitter Happier</p>
          <img src="/logo.png" className="d-inline-block align-top" alt="" />
        </Link>
        <nav className="navbar navbar-expand">
          <div className="navbar-nav" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;
