"use client";
import { useState, useEffect } from 'react';
import React from 'react';

import '../projects.css';
import {db, storage, getDownloadURL, ref} from '../../store/firebaseConfig';
import {getDoc, doc} from 'firebase/firestore';
import Image from 'next/image';
import MyEditor from '../../components/layouts/Editor/Editor';

export default function ProjectsDetail({params}) {
  const [content, setContent] = useState();
  const [isLoadInfo, setIsLoadInfo] = useState(false);
  const [isLoadImg, setIsLoadImg] = useState(false);

  useEffect(()=> {
    handleSetInfoFromStore();
  },[]);

  useEffect(() => {
    if(content) {
      handleGetImg();
    }
  },[content]);

  const handleSetInfoFromStore = async () => {
    const path = `projects/${params.projectID}`;
    const docRef = doc(db, path);
    try {
      const snapShot = await getDoc(docRef);
      if(snapShot.exists()) {
        const data = snapShot.data();
        setContent(data);
        console.log("project data: ", data);
        setIsLoadInfo(true);
      }
      console.log("done!");
    }catch(error) {
      console.error("Error", error);
    }
  };

  const handleGetImg = async () => {
    if(!content || !content.fileNames) {
      console.log("Content or fileNames not available yet");
      return;
    }
    try {
      const updatedFileNames = await Promise.all(
        content.fileNames.map(async (fileName) => {
          const _tmpRef = `${content.imgDir}/${fileName}`;
          const _storageRef = ref(storage, _tmpRef);
          return getDownloadURL(_storageRef);
        })
      );
  
      const updatedContent = {
        ...content,
        fileNames: updatedFileNames
      };
  
      setContent(updatedContent);
      setIsLoadImg(true);
    } catch (err) {
      console.error("Error", err);
    }
  };

  return(
    <>
    <h1>My Post: {params.projectID}</h1>
    {isLoadImg && content ? (
      <>
      <MyEditor 
      fileNames={content.fileNames}
    />
      <h1>projectName: {content.projectName}</h1>
      <p>
        {content.contents.split('¥n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <Image 
          key={content.imgDir} src={content.fileNames[0]}
          width={1280} height={720}
          alt= {content.imgDir}/>
      </>
    ):(
      <>
      <p>Loading....</p>
      </>
    )}

    </>
  );
}