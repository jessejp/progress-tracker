import css from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1 className={css.heading}>progress tracker app v0</h1>
      <div className={css.menuSelections}>
        <NavLink
          to="/entries"
          className={(navData) =>
            navData.isActive ? css.active : css.inactive
          }
        >
          <div className={css.menuItem}>Entries</div>
        </NavLink>

        {/* <NavLink
          to="/addnew"
          className={(navData) =>
            navData.isActive ? css.active : css.inactive
          }
        >
          <div className={css.menuItem}>Add New</div>
        </NavLink> */}

        <NavLink
          to="/graphs"
          className={(navData) =>
            navData.isActive ? css.active : css.inactive
          }
        >
          <div className={css.menuItem}>Graphs</div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
