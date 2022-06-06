import axios from "axios";
import { entryActions } from "./entries-slice";
import { graphDataActions } from "./graph-data-slice";
import { uiActions } from "./ui-slice";
import { APIJSON } from "../strings/APIJSON";

import { db } from "../firebase-config";
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: APIJSON,
});

const auth = getAuth();

const entriesCollectionRef = collection(db, "entries");

// Action creator thunk
export const getEntryData = () => {
  return async (dispatch) => {
    const getData = async () => {
      const user = auth.currentUser;
      console.log(user);
      if (!user) {
        throw new Error("No USER");
      }

      const entriesRef = query(
        entriesCollectionRef,
        where("userid", "==", user.uid)
      );
      const data = await getDocs(entriesRef);

      return data.docs.map((doc) => doc.data());
    };

    try {
      const entriesData = await getData();
      console.log("App.js getEntryData from firebase");
      console.log(entriesData);
      dispatch(entryActions.replaceEntries({ entries: entriesData || [] }));
    } catch (error) {
      console.log("getEntryData:", error);
    }
  };
};

export const sendEntryData = (entries, type) => {
  return async () => {
    const sendRequest = async () => {
      /*  await api.patch("/entries.json", entries); */
      const user = auth.currentUser;
      console.log(entries);
      if (type === "add") {
        await addDoc(entriesCollectionRef, { ...entries[0], userid: user.uid });
      } else if (type === "update") {
        // update doc
      }
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
      console.log("graph sending request to /graphdata.json", data);
      await api.patch("/graphdata.json", data);
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("sendGraphData:", error);
    }
  };
};
