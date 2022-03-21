import css from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1 className={css.heading}>progress tracker app v0</h1>
      <div className={css.menuSelections}>
        <div className={css.menuItem}>
          <NavLink
            to="/entries"
            className={(navData) =>
              navData.isActive ? css.active : css.inactive
            }
          >
            Entries
          </NavLink>
        </div>
        <div className={css.menuItem}>
          <NavLink
            to="/addnew"
            className={(navData) =>
              navData.isActive ? css.active : css.inactive
            }
          >
            Add New
          </NavLink>
        </div>
        <div className={css.menuItem}>
          <NavLink
            to="/graphs"
            className={(navData) =>
              navData.isActive ? css.active : css.inactive
            }
          >
            Graphs
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
