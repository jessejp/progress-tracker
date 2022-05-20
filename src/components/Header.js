import css from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendEntryData, sendGraphData } from "../store/data-actions";

const Header = () => {
  const authData = useSelector((state) => state.auth);
  const entriesData = useSelector((state) => state.entries);
  const graphData = useSelector((state) => state.graph);
  const dispatch = useDispatch();

  const saveDataHandler = () => {
    console.log(entriesData);
    console.log(graphData);
    dispatch(sendEntryData(entriesData));
    dispatch(sendGraphData(graphData));
  };

  return (
    <header>
      <div className={css.headingContainer}>
        <h1 className={css.heading}>Progress Tracker</h1>
        <div>
          <button onClick={saveDataHandler}>save</button>
          {!authData.isLoggedIn && (
            <Link to="authenticate">Login to save data</Link>
          )}
          {authData.isLoggedIn && <p>Logged in as {authData.email}</p>}
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
