import { NavLink } from 'react-router-dom';
import { navigationLinkActive } from '../utils';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.navigationItemsBox}>
          <li>
            <NavLink
              to="/"
              className={`${navigationLinkActive} navLink`}
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={`${navigationLinkActive} navLink`}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={`${navigationLinkActive} navLink`}
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;