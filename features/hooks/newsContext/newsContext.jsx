'use client';
import { createContext, useState, useEffect } from 'react';
import { db } from '../../../app/store/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export const NewsContext = createContext(null);

export const NewsContextProvider = (props) => {
  const [news, setNews] = useState([]);
  const [newsInfo, setNewsInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [showNewsNum, setShowNewsNum] = useState(0);
  const [isNews, setIsNews] = useState(false);
  const [isInfo, setIsInfo] = useState(false);

  const handleReadFromStore = async () => {
    const docRef = collection(db, 'news');
    try {
      const snapShot = await getDocs(docRef);
      const newsData = snapShot.docs.map((doc) => doc.data());
      setNews(newsData.reverse());
      sessionStorage.setItem('newsContents', JSON.stringify(newsData));
      console.log('read news');
    } catch (e) {
      console.error('ERROR', e);
    }
  };

  const handleReadInfo = async () => {
    const docRef = doc(db, 'news/info');
    try {
      const snapShot = await getDoc(docRef);
      if (snapShot.exists()) {
        const data = snapShot.data();
        setNewsInfo(data);
        sessionStorage.setItem('newsInfo', JSON.stringify(data));
      }
      setIsInfo(true);
    } catch (e) {
      console.error('Error', e);
    }
  };

  const handleChangeNum = (num) => {
    setShowNewsNum(num);
  };

  useEffect(() => {
    if (sessionStorage.getItem('newsContents') === null) {
      //sessionStorageにデータがなかったら、firebaseを見に行く
      handleReadFromStore();
    } else {
      //sessionStorageからデータを取得
      setNews(JSON.parse(sessionStorage.getItem('newsContents')));
    }
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      if (sessionStorage.getItem('newsInfo') === null) {
        handleReadInfo();
      } else {
        setNewsInfo(JSON.parse(sessionStorage.getItem('newsInfo')));
      }
    }
    if (news.length > 0 && newsInfo.length > 0) {
      //console.log(newsInfo);
      setIsLoad(true);
    }
  }, [news]);
  useEffect(() => {
    //console.log('newsInfo');
    //console.log(newsInfo);
    if (news.length > 0 && newsInfo !== null) {
      //console.log(newsInfo);
      setIsLoad(true);
    }
  }, [newsInfo]);

  return (
    <NewsContext.Provider
      value={{ news, newsInfo, isLoad, showNewsNum, handleChangeNum }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};
