import { entryActions } from "./entries-slice";
import { graphDataActions } from "./graph-data-slice";
import { uiActions } from "./ui-slice";

import { db, auth } from "../firebase-config";
import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { authActions } from "./auth-slice";

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
      console.log("data-actions.js getEntryData from firebase", entriesData);

      //entries initialized either successfully or with an error.
      dispatch(authActions.firestoreEntriesInitialized());

      if (!entriesData.length) {
        throw new Error("no existing entry data");
      }

      dispatch(entryActions.replaceEntries({ entries: entriesData || [] }));
      dispatch(authActions.firestoreEntriesFound());
    } catch (error) {
      console.log("getEntryData:", error);
    }
  };
};

export const sendEntryData = (entries, dataExists) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const user = auth.currentUser;
      if (!entries.length) {
        throw new Error("sendEntryData: No Entries!");
      } else if (!dataExists && entries.length) {
        console.log("sendEntryData addDoc", entries);

        await addDoc(entriesCollectionRef, { ...entries[0], userid: user.uid });
        dispatch(authActions.firestoreEntriesFound());
      } else if (dataExists && entries.length) {
        // update doc
        console.log("sendEntryData updateDoc", entries);

        const entriesRef = query(
          entriesCollectionRef,
          where("userid", "==", user.uid)
        );
        const data = await getDocs(entriesRef);

        return data.docs.map((doc) =>
          updateDoc(doc.ref, { entryData: entries[0].entryData })
        );
      }
    };

    try {
      await sendRequest();
      dispatch(uiActions.saveEntriesData());
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
      console.log("data-actions.js getGraphData from firebase", graphData);

      //graph data initialized either successfully or with an error
      dispatch(authActions.firestoreGraphDataInitialized());

      if (!graphData.length) {
        throw new Error("no existing graph data");
      }

      dispatch(graphDataActions.replaceGraphData({ data: graphData || [] }));
      dispatch(authActions.firestoreGraphDataFound());
    } catch (error) {
      console.log("getGraphData:", error);
    }
  };
};

export const sendGraphData = (graphData, dataExists) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const user = auth.currentUser;
      if (!graphData.length) {
        throw new Error("sendGraphData: No GraphData!");
      } else if (!dataExists && graphData.length) {
        console.log("sendGraphData addDoc", graphData);

        await addDoc(graphCollectionRef, { ...graphData[0], userid: user.uid });
        dispatch(authActions.firestoreGraphDataFound());
      } else if (dataExists && graphData.length) {
        // update doc
        console.log("sendGraphData updateDoc", graphData);

        const graphDataRef = query(
          graphCollectionRef,
          where("userid", "==", user.uid)
        );
        const data = await getDocs(graphDataRef);

        return data.docs.map((doc) =>
          updateDoc(doc.ref, { graphData: graphData[0].graphData })
        );
      }
    };

    try {
      await sendRequest();
      dispatch(uiActions.saveGraphData());
    } catch (error) {
      console.log("sendGraphData:", error);
    }
  };
};