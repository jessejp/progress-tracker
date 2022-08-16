import React, { useEffect, useState } from "react";
import css from "./Graph.module.css";
import { colorPalette } from "../../functions/rpeStrings";
import { useSelector } from "react-redux";

const BarGraph = (props) => {
  const currentWeek = useSelector((state) => state.ui.currentWeek);
  const { dataState, category } = props;

  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [graphBars, setGraphBars] = useState();
  const [inactiveGraphBars, setInactiveGraphBars] = useState([]);
  const [showInactive, setShowInactive] = useState(false);

  // select week's entries
  useEffect(() => {
    if (category > -1 && selectedWeek) {
      let barGraphEntries = [];
      dataState[category].graphData.map((entry, entryIndex) => {
        barGraphEntries.push({
          name: entry.name,
          weeklySets: [],
        });
        return entry.date.forEach((date, dateIndex) => {
          if (date.week === selectedWeek) {
            barGraphEntries[entryIndex].weeklySets.push(entry.sets[dateIndex]);
          }
        });
      });
      setGraphBars(barGraphEntries.filter((entry) => entry.weeklySets.length));
      setInactiveGraphBars(
        barGraphEntries.filter((entry) => entry.weeklySets.length === 0)
      );
    }
  }, [dataState, category, selectedWeek]);

  const changeWeekHandler = (event) => {
    if (event.target.innerHTML === "&lt;") {
      setSelectedWeek((prevState) => prevState - 1);
    } else if (event.target.innerHTML === "&gt;") {
      setSelectedWeek((prevState) => prevState + 1);
    }
  };

  const enableShowInactiveHandler = () => {
    setShowInactive((state) => !state);
  };

  return (
    <div className={`${css.graphFlexContainer}`}>
      <div className={`${css.barGraphFlex} ${css.barGraphHeadingCont}`}>
        <div className={`${css.barGraphFlex}`}>
          <button onClick={changeWeekHandler}>{"<"}</button>
          <h2>Week: {selectedWeek}</h2>
          {selectedWeek < currentWeek && (
            <button onClick={changeWeekHandler}>{">"}</button>
          )}
        </div>
        <button onClick={enableShowInactiveHandler}>
          {showInactive ? "Hide Inactive." : "Show Inactive."}
        </button>
      </div>
      <div className={`${css.barGraphFlex}`}>
        {graphBars &&
          graphBars.map((entry) => {
            const initialValue = 0;
            const totalSets = entry.weeklySets.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              initialValue
            );
            let barHeightMultiplyer =
              Math.round(totalSets / 2) < 6 ? Math.round(totalSets / 2) : 5;
            return (
              <div className={css.barContainer} key={entry.name}>
                <div
                  className={css.bar}
                  style={{
                    backgroundColor: colorPalette[barHeightMultiplyer - 1],
                    width: 50,
                    height: barHeightMultiplyer * 25,
                  }}
                >
                  {totalSets}
                </div>
                <div className={css.barName}>{entry.name}</div>
              </div>
            );
          })}
        {showInactive &&
          inactiveGraphBars.map((entry) => {
            return (
              <div className={css.barContainer} key={entry.name}>
                <div
                  className={css.bar}
                  style={{
                    backgroundColor: "#cccbbb",
                    width: 50,
                    height: 25,
                  }}
                >
                  0
                </div>
                <div className={css.barName}>{entry.name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BarGraph;
