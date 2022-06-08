import { entryActions } from "./entries-slice";
import { graphDataActions } from "./graph-data-slice";
import { uiActions } from "./ui-slice";

import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { authActions } from "./auth-slice";

const auth = getAuth();

const entriesCollectionRef = collection(db, "entries");
const graphCollectionRef = collection(db, "graphData");

// Action creator thunk
export const getEntryData = () => {
  return async (dispatch) => {
    const getData = async () => {
      const user = auth.currentUser;
      
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
      dispatch(entryActions.replaceEntries({ entries: entriesData || [] }));
      dispatch(authActions.firestoreEntriesFound());
    } catch (error) {
      console.log("getEntryData:", error);
    }
  };
};

export const sendEntryData = (entries, dataExists) => {
  return async () => {
    const sendRequest = async () => {
      const user = auth.currentUser;
      console.log("sendEntryData", entries);
      if(!entries.length) {
        throw new Error('sendEntryData: No Entries!')
      }
      else if (!dataExists && entries.length) {
        await addDoc(entriesCollectionRef, { ...entries[0], userid: user.uid });
      } else if (dataExists && entries.length) {
        // update doc
        const entriesRef = query(
          entriesCollectionRef,
          where("userid", "==", user.uid)
        );
        const data = await getDocs(entriesRef);

        return data.docs.map((doc) => updateDoc(doc.ref, {"entryData": entries[0].entryData}));
        // await updateDoc(data, { ...entries[0].entryData });
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
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error("No USER");
      }

      const graphDatasRef = query(
        graphCollectionRef,
        where("userid", "==", user.uid)
      );
      const data = await getDocs(graphDatasRef);

      return data.docs.map((doc) => doc.data());
    };

    try {
      const graphData = await getData();
      console.log("Graph.js getGraphData from firebase", graphData);
      
      dispatch(graphDataActions.replaceGraphData({ data: graphData || [] }));
      dispatch(authActions.firestoreGraphDataFound());
      dispatch(uiActions.graphLoaded());
    } catch (error) {
      console.log("getGraphData:", error);
    }
  };
};

export const sendGraphData = (graphData, dataExists) => {
  return async () => {
    const sendRequest = async () => {
      const user = auth.currentUser;
      console.log("sendGraphData", graphData);
      if(!graphData.length) {
        throw new Error('sendGraphData: No GraphData!')
      }
      else if (!dataExists && graphData.length) {
        await addDoc(graphCollectionRef, { ...graphData[0], userid: user.uid });
      } else if (dataExists && graphData.length) {
        // update doc
        const graphDataRef = query(
          graphCollectionRef,
          where("userid", "==", user.uid)
        );
        const data = await getDocs(graphDataRef);

        return data.docs.map((doc) => updateDoc(doc.ref, {"graphData": graphData[0].graphData}));
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("sendGraphData:", error);
    }
  };
};
