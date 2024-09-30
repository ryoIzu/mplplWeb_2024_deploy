'use client';

import { createContext, useState, useEffect } from 'react';
import { db } from '../../../app/store/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const WorksContext = createContext(null);

export const WorksContextProvider = (props) => {
  const [works, setWorks] = useState([]);
  const [worksInfo, setWorksInfo] = useState([]);
  const [isLoadWorks, setIsLoadWorks] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('worksContents') === null) {
      //read from store
      handleRead_fromStore();
    } else {
      console.log('read from sessionStorage');
      setWorks(JSON.parse(sessionStorage.getItem('worksContents')));
      setWorksInfo(JSON.parse(sessionStorage.getItem('worksInfo')));
      setIsLoadWorks(true);
    }
  }, []);

  const handleRead_fromStore = async () => {
    console.log('read from store.');
    const docRef = collection(db, 'works');
    try {
      const snapShot = await getDocs(docRef);
      const worksData = snapShot.docs.map((doc) => doc.data());
      worksData.map((tmpData, index) => {
        if (tmpData.title === 'info') {
          setWorksInfo(tmpData);
          sessionStorage.setItem('worksInfo', JSON.stringify(tmpData));
          worksData.splice(index, 1);
        }
      });
      setWorks([...worksData].reverse());
      sessionStorage.setItem(
        'worksContents',
        JSON.stringify([...worksData].reverse()),
      );
    } catch (e) {
      console.error('error: ', e);
    }
    setIsLoadWorks(true);
  };
  return (
    <WorksContext.Provider value={{ works, worksInfo, isLoadWorks }}>
      {props.children}
    </WorksContext.Provider>
  );
};
