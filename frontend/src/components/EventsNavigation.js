import { NavLink } from 'react-router-dom';
import { navigationLinkActive } from '../utils';
import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink className={`${navigationLinkActive} navLink`} to="/events" end>All Events</NavLink>
          </li>
          <li>
            <NavLink className={`${navigationLinkActive} navLink`} to="/events/new">New Event</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
