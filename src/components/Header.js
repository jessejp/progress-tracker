import css from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../store/auth-actions";

const Header = () => {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signoutUserHandler = () => {
    dispatch(signOutUser());
  };

  return (
    <header>
      <div className={css.headingContainer}>
        <NavLink to="/entries">
          <h1 className={css.heading}>Progress Tracker</h1>
        </NavLink>
        <div>
          {!authData.isLoggedIn && (
            <Link to="authenticate">Login to save data</Link>
          )}
          {authData.isLoggedIn && (
            <>
              <p>{authData.email}</p>
              <button className="generic" onClick={signoutUserHandler}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
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
