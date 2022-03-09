import { useContext, useEffect } from "react";
import DataContext from "../store/data-context";

const Graph = () => {
  const dataCtx = useContext(DataContext);

  const { entries } = dataCtx;

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  return (
    <div>
      <div>graph.</div>
      <div>{dataCtx.totalAmount}</div>
    </div>
  );
};

export default Graph;
