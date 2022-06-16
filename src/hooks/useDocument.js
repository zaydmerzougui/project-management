import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export default function useDocument(collection, id) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
        } else {
          setError("no such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );
    return () => {
      unsub();
    };
  }, [collection, id]);
  return { document, error };
}
