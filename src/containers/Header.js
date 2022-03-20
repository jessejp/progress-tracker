import css from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1 className={css.heading}>progress tracker app v0</h1>
      <div className={css.menuSelections}>
        <div className={css.menuItem}>
          <NavLink to="/entries">Entries</NavLink>
        </div>
        <div className={css.menuItem}>
          <NavLink to="/addnew">Add New</NavLink>
        </div>
        <div className={css.menuItem}>
          <NavLink to="/graphs">Graphs</NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
