import { React, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDa4tpdNVuALm-6zgDgg_NWgZV27L3gdjc",
  authDomain: "rapid-prototyping-react.firebaseapp.com",
  databaseURL: "https://rapid-prototyping-react-default-rtdb.firebaseio.com",
  projectId: "rapid-prototyping-react",
  storageBucket: "rapid-prototyping-react.appspot.com",
  messagingSenderId: "547447220342",
  appId: "1:547447220342:web:b5152010a1c4fa6fa91757"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};