import css from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <h1 className={css.heading}>progress tracker app v0</h1>
      <div>
        <div className={css.menuSelections}>
          <div className={css.menuItem}>Entries</div>
          <div className={css.menuItem}>Add New Entry</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
