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
          <div className={`${css.menuItem} iconTextLink`}>
            <span className="material-icons-outlined">edit_note</span>
            <span>Entries</span>
          </div>
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
          <div className={`${css.menuItem} iconTextLink`}>
            <span className="material-icons-outlined">timeline</span>
            <span>Graphs</span>
          </div>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
