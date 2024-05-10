import { NavLink } from 'react-router-dom';
import { navigationLinkActive } from '../utils';
import styles from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={styles.header}>
      <nav className={styles.mainNavigationBox}>
        <ul className={styles.navigationItemsBox}>
          <li>
            <NavLink className={`${navigationLinkActive} navLink`} to="/" end>Home</NavLink>
          </li>
          <li>
            <NavLink className={`${navigationLinkActive} navLink`} to="/events">Events</NavLink>
          </li>
          {/* <li>
            <NavLink className={`${navigationLinkActive} navLink`} to="/detail/:eventId">Event Detail</NavLink>
          </li>
          <li>
            <NavLink className={`${navigationLinkActive} navLink`} to="/new">New Event</NavLink>
          </li>
          <li>
            <NavLink className={`${navigationLinkActive} navLink`} to="/:eventId/edit">Edit Event</NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
