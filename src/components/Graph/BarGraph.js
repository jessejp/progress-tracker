import React, { useEffect, useState } from "react";
import css from "./Graph.module.css";
import { colorPalette } from "../../functions/rpeStrings";

const BarGraph = (props) => {
  const { dataState, category } = props;
  
  const [graphBars, setGraphBars] = useState();

  // select week's entries
  useEffect(() => {
    if (category > -1) {
      let barGraphEntries = [];
      dataState[category].graphData.map((entry, entryIndex) => {
        barGraphEntries.push({
          name: entry.name,
          weeklySets: [],
          weeklyMass: [],
        });
        return entry.date.forEach((date, dateIndex) => {
          if (date.week === 20) {
            barGraphEntries[entryIndex].weeklySets.push(entry.sets[dateIndex]);
            barGraphEntries[entryIndex].weeklyMass.push(entry.mass[dateIndex]);
          }
        });
      });
      console.log("new bar graph", barGraphEntries);
      setGraphBars(barGraphEntries);
    }
  }, [dataState, category]);

  console.log(graphBars);

  if (graphBars) {
    return (
      <div className={`${css.graphFlexContainer} ${css.barGraphFlex}`}>
        {graphBars.map((entry) => {
          const initialValue = 0;
          const totalSets = entry.weeklySets.reduce(
            (previousValue, currentValue) => previousValue + currentValue, initialValue
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
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default BarGraph;
