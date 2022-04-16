import axios from "axios";
import { entryActions } from "./entries-slice";
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
      let res = await api.get("/graphData.json");
      console.log(res.data);
      if (!res.data) {
        throw new Error("No graph data to fetch!");
      }
      return res.data;
    };

    try {
      const entriesData = await getData();
      dispatch(
        entryActions.replaceEntries({ entries: entriesData.entries || [] })
      );
    } catch (error) {
      console.log("getGraphData:", error);
    }
  };
};

export const sendGraphData = (data) => {
  return async () => {
    const sendRequest = async () => {
      await api.patch("/graphData.json", data);
    };

    try {
      console.log("sendGraphData");
      await sendRequest();
    } catch (error) {
      console.log("sendGraphData:", error);
    }
  };
};
