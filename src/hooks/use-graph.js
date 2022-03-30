import { useState, useCallback } from "react";

const useGraph = () => {
  const svgCalculateYLocation = useCallback((sortableArr, sort = true) => {
    let sortedArr = [...sortableArr];
    if (sort) {
      sortedArr.sort(function (a, b) {
        return a - b;
      });
    }

    let yCoords = [];
    const last = sortedArr.length - 1;

    for (let i = 0; i < sortedArr.length; i++) {
      yCoords.push((sortedArr[i] / sortedArr[last]) * 80);
    }
    return {
      unsorted: sortableArr,
      sorted: sortedArr,
      yCoords: yCoords,
    };
  }, []);

  return svgCalculateYLocation;
};

export default useGraph;
