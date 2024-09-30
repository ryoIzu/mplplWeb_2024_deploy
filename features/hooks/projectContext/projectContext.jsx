'use client';
import { createContext, useState, useEffect } from 'react';
import { db } from '../../../app/store/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const ProjectContext = createContext(null);

export const ProjectContextProvider = (props) => {
  const [projects, setProjects] = useState([]);
  const [projectInfo, setProjectInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [showProjectNum, setSowProjectNum] = useState(0);

  //read from firestore
  useEffect(() => {
    if (sessionStorage.getItem('projectContents') === null) {
      //sessionStorageにデータがなかったら、firestoreを見に行く
      handleReadFromStore();
    } else {
      //sessionStorageから読み込む
      console.log('read from sessionStorage');
      setProjects(JSON.parse(sessionStorage.getItem('projectContents')));
      setProjectInfo(JSON.parse(sessionStorage.getItem('projectInfo')));
      setIsLoad(true);
    }
  }, []);

  const handleReadFromStore = async () => {
    const docRef = collection(db, 'projects');
    try {
      const snapShot = await getDocs(docRef);
      const projectsData = snapShot.docs.map((doc) => doc.data());
      projectsData.map((tmpDat, index) => {
        if (tmpDat.name === 'info') {
          setProjectInfo(tmpDat);
          sessionStorage.setItem('projectInfo', JSON.stringify(tmpDat));
          projectsData.splice(index, 1);
        }
      });
      setProjects([...projectsData].reverse());
      sessionStorage.setItem(
        'projectContents',
        JSON.stringify([...projectsData].reverse()),
      );
    } catch (e) {
      console.error('ERROR', e);
    }
    setIsLoad(true);
  };

  const handleReadInfo = async () => {
    const docRef = doc(db, 'news/info');
    try {
      const snapShot = await getDoc(docRef);
      if (snapShot.exists()) {
        const data = snapShot.data();
        setProjectInfo(data);
      }
    } catch (e) {
      console.error('Error', e);
    }
  };

  const handleChangeNum = (num) => {
    setSowProjectNum(num);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, projectInfo, isLoad, showProjectNum, handleChangeNum }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
