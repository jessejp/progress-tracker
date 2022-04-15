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
        throw new Error("No data to fetch!");
      }
      return res.data;
    };

    try {
      const entriesData = await getData();
      dispatch(
        entryActions.replaceEntries({ entries: entriesData.entries || [] })
      );
    } catch (error) {
      console.log("getEntryData error:", error);
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
      console.log("sendEntryData error:", error);
    }
  };
};
