import css from "./Entries.module.css";
/*
<EntriesDataInput 
    onUpdateBufferButton={updateValueBtnHandler} 
    onUpdateInputField={updateValueInputHandler}
    dataName={dataValues.name}
    dataValue={dataValues.mass}
    onEnableEditing={enableEditingHandler}
    enableEditingState={enableEditing}
> 
*/

const EntriesDataInput = (props) => {
  const dataEditSimpleForm = (
    <div className={css.numPadContainer}>
      <button
        name={props.type}
        className={css.numBuff}
        id="BUFF"
        onClick={props.onUpdateBufferButton}
      >
        +{props.bufferValue}
      </button>
      <input
        name={props.type}
        autoFocus
        className={css.numPad}
        id="NUMBER"
        type="number"
        value={props.dataValue}
        onChange={props.onUpdateInputField}
        onKeyDown={props.onEnableEditing}
        min=""
      />
      <button
        name={props.type}
        className={css.numDebuff}
        id="DEBUFF"
        onClick={props.onUpdateBufferButton}
      >
        -{props.bufferValue}
      </button>
    </div>
  );

  return (
    <div
      className={css.col}
      name={props.type}
      onClick={props.onEnableEditing}
      onBlur={props.onEnableEditing}
      onFocus={props.onEnableEditing}
    >
      {!props.enableEditingState && (
        <span
          className={css.tableData}
          onKeyDown={props.onEnableEditing}
          tabIndex={0}
        >
          {props.dataValue}
          {props.unit}
        </span>
      )}
      {props.enableEditingState && dataEditSimpleForm}
    </div>
  );
};

export default EntriesDataInput;
