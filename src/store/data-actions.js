import axios from "axios";
import { entryActions } from "./entries-slice";
import { graphDataActions } from "./graph-data-slice";
import { uiActions } from "./ui-slice";
import { APIJSON } from "../strings/APIJSON";

const api = axios.create({
  baseURL: APIJSON,
});

// Action creator thunk
export const getEntryData = () => {
  return async (dispatch) => {
    const getData = async () => {
      let res = await api.get("/entries.json");
      console.log(res.data);
      if (!res.data) {
        throw new Error("No entries to fetch!");
      }
      return res.data;
    };

    try {
      const entriesData = await getData();
      console.log("App.js getEntryData from firebase");
      dispatch(
        entryActions.replaceEntries({ entries: entriesData.entries || [] })
      );
    } catch (error) {
      console.log("getEntryData:", error);
    }
  };
};

export const sendEntryData = (entries) => {
  return async () => {
    const sendRequest = async () => {
      await api.patch("/entries.json", entries);
    };

    try {
      console.log("sendEntryData");
      await sendRequest();
    } catch (error) {
      console.log("sendEntryData:", error);
    }
  };
};

export const getGraphData = () => {
  return async (dispatch) => {
    const getData = async () => {
      let res = await api.get("/graphdata.json");
      console.log(res.data);
      if (!res.data) {
        throw new Error("No graph data to fetch!");
      }
      return res.data;
    };

    try {
      const graphData = await getData();
      console.log("Graph.js getGraphData from firebase");
      dispatch(
        graphDataActions.replaceGraphData({ data: graphData.data || [] })
      );
      dispatch(uiActions.graphLoaded());
    } catch (error) {
      console.log("getGraphData:", error);
    }
  };
};

export const sendGraphData = (data) => {
  return async () => {
    const sendRequest = async () => {
      console.log('graph sending request to /graphdata.json', data)
      await api.patch("/graphdata.json", data);
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("sendGraphData:", error);
    }
  };
};
