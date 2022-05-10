import css from "./Entries.module.css";
/*
<EntriesDataInput 
    onUpdateBufferButton={updateValueBtnHandler} 
    onUpdateInputField={updateValueInputHandler}
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

  if (props.type !== "RPE") {
    return (
      <div
        className={css.flexItem}
        name={props.type}
        onClick={props.onEnableEditing}
        onBlur={props.onEnableEditing}
        onFocus={props.onEnableEditing}
      >
        <label htmlFor={props.type}>{props.type}</label>
        {!props.enableEditingState && (
          <div
            className={css.valueField}
            onKeyDown={props.onEnableEditing}
            tabIndex={0}
          >
            {props.dataValue}
            {props.unit}
          </div>
        )}
        {props.enableEditingState && dataEditSimpleForm}
      </div>
    );
  }
  if (props.type === "RPE") {
    return (
      <div
        className={css.flexItem}
        name={props.type}
        onClick={props.onEnableEditing}
        onBlur={props.onEnableEditing}
        onFocus={props.onEnableEditing}
      >
        <label htmlFor={props.type}>{props.type}</label>
        {!props.enableEditingState && (
          <div className={css.valueField}><span>{props.dataValue + 1}</span><span>: {props.rpeText[props.dataValue]}</span></div>
        )}
        {props.enableEditingState && (
          <input
            name={props.type}
            id="NUMBER"
            onChange={props.onUpdateInputField}
            onKeyDown={props.onEnableEditing}
            defaultValue={props.dataValue}
            type="range"
            step="1"
            min="0"
            max="4"
          />
        )}
      </div>
    );
  }

};

export default EntriesDataInput;
