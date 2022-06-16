import { projectFirestore, timestamp } from "../firebase/config";
import { useReducer, useEffect, useState } from "react";
let initialState = {
  document: null,
  error: null,
  isPending: false,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DOCUMENT":
      return {
        document: action.payload,
        error: null,
        isPending: false,
        success: true,
      };
    case "IS_PENDING":
      return { document: null, error: null, isPending: true, success: null };
    case "ERROR":
      return {
        document: null,
        error: action.payload,
        isPending: false,
        success: false,
      };
    case "DELETED_DOCUMENT":
      return {
        document: null,
        error: null,
        isPending: false,
        success: true,
      };
    case "UPDATED_DOCUMENT":
      return {
        document: action.payload,
        error: null,
        isPending: false,
        success: true,
      };

    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) dispatch(action);
  };
  const ref = projectFirestore.collection(collection);

  const createdAt = timestamp.fromDate(new Date());
  // add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  // update documents
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updatedDocument = await ref.doc(id).update(updates);
      dispatchIfNotCancelled({
        type: "  UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { response, addDocument, deleteDocument, updateDocument };
};
