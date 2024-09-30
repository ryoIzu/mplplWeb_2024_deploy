'use client';
import { useState, useEffect, useContext } from 'react';
import '../news.css';

import { db, storage, ref, getDownloadURL } from '../../store/firebaseConfig';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { NewsContext } from '@/features/hooks/newsContext/newsContext';
import MyEditor from '@/app/components/layouts/Editor/Editor';
import Link from 'next/link';

export default function NewsDetail() {
  const { news, isLoad, neswInfo } = useContext(NewsContext);
  const params = useParams();
  const searchParams = useSearchParams();
  const news_index = searchParams.get('index');
  const news_id = params.newsID;
  const storePath = `news/${news_id}`;
  const [content, setContent] = useState([]);
  const [isLoadStore, setIsLoadStore] = useState(false);

  const [inputDate, setInputDate] = useState();
  const [inputTitle, setInputTitle] = useState();
  const [inputIsShow, setInputIsShow] = useState(true);
  const [inputUpdate, setInputUpdate] = useState();
  const [inputCategory, setInputCategory] = useState();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoad === true) {
      //handleSetFromStore();
      //setContent(news[storePath]);
      setContent(news[parseInt(news_index)]);
      console.log('news: ' + news[parseInt(news_index)]);
      setIsLoadStore(true);
    }
  }, [isLoad]);

  useEffect(() => {
    setInputTitle(content.title);
    setInputDate(content.date);
    setInputIsShow(content.isShow);
    setInputUpdate(content.update);
    if (isLoadStore) {
      setTimeout(() => {
        setIsVisible(true);
      }, 100); //
    }
  }, [isLoadStore]);

  const handleSetFromStore = async () => {
    const docRef = doc(db, storePath);
    try {
      const snapShot = await getDoc(docRef);
      if (snapShot.exists()) {
        const data = snapShot.data();
        setContent(data);
        console.log('data: ', data);
      }
    } catch (e) {
      console.error('Error', e);
    }
    setIsLoadStore(true);
  };

  const handleOnChange = (e) => {
    if (e.target.id === 'input_title') {
      setInputTitle(e.target.value);
    } else if (e.target.id === 'input_date') {
      setInputDate(e.target.value);
    } else if (e.target.id === 'input_isShow') {
      setInputIsShow(e.target.value);
    } else if (e.target.id === 'input_isShow2') {
      setInputIsShow(e.target.value);
    } else if (e.target.id === 'input_update') {
      setInputUpdate(e.target.value);
    } else if (e.target.id === 'input_category') {
      setInputCategory(e.target.value);
    }
  };

  const handleDataUpdate = async () => {
    if (isLoadStore) {
      console.log('click update');
      try {
        const promise = async () => {
          //docIDがすでにあるのなら更新
          //ない時は新規作成
          const docID = news_id;
          const docRef = doc(db, 'news', docID);
          const data = {
            title: inputTitle,
            isShow: inputIsShow,
            date: inputDate,
            update: inputUpdate,
            category: inputCategory,
            description: [],
          };
          if (news_id !== inputDate) {
            const docRef = doc(db, 'news', news_id);
            const oldSnap = await getDoc(docRef);
            if (oldSnap.exists()) {
              const newDocRef = doc(db, 'news', inputDate);
              await setDoc(newDocRef, data);
              //await deleteDoc(doc(db, 'news', news_id));
            }
          } else {
            await updateDoc(docRef, data);
          }
        };
        await promise();
        //alert('updated');
        //自動更新
        //router.push(`./${inputDate}`);
      } catch (e) {
        console.error('Error', e);
      }
    }
  };

  return (
    <>
      {isLoadStore ? (
        <div className={`fade-in-detail ${isVisible ? 'visible' : ''}`}>
          <div className="div_detail">
            <h3>{content.title}</h3>
            <br />
            <p>
              Date:&nbsp;&nbsp;&nbsp; {content.date.slice(0, 4)}.
              {content.date.slice(4, 6)}.{content.date.slice(6, 8)}
              <span style={{ marginLeft: '80px' }}>
                Category:&nbsp;&nbsp;&nbsp; {content.category}
              </span>
            </p>
            <br />
          </div>
          <div className="newsContents">
            {Object.keys(content.description).length != false ? (
              content.description.blocks.map((block) => {
                return block.type === 'header-one' ? (
                  block.entityRanges.length > 0 ? (
                    <h1>
                      <Link
                        href={
                          content.description.entityMap[
                            block.entityRanges[0].key
                          ].data.url
                        }
                      >
                        <a>{block.text}</a>
                        <br />
                      </Link>
                    </h1>
                  ) : (
                    <>
                      <h1>{block.text}</h1>
                    </>
                  )
                ) : block.type === 'header-two' ? (
                  block.entityRanges.length > 0 ? (
                    <>
                      <h2
                        href={
                          content.description.entityMap[
                            block.entityRanges[0].key
                          ].data.url
                        }
                      >
                        {block.text}
                      </h2>
                    </>
                  ) : (
                    <h2>{block.text}</h2>
                  )
                ) : block.type === 'header-three' ? (
                  block.entityRanges.length > 0 ? (
                    <h3
                      href={
                        content.description.entityMap[block.entityRanges[0].key]
                          .data.url
                      }
                    >
                      {block.text}
                    </h3>
                  ) : (
                    <h3>{block.text}</h3>
                  )
                ) : block.entityRanges.length > 0 ? (
                  <a
                    href={
                      content.description.entityMap[block.entityRanges[0].key]
                        .data.url
                    }
                  >
                    {block.text}
                  </a>
                ) : (
                  <>{block.text.length > 0 ? <p>{block.text}</p> : <br />}</>
                );
              })
            ) : (
              <></>
            )}
            {/*
            <MyEditor
              pageName={'news'}
              id={news_id}
              defaultText={content.description}
            />
            <button onClick={handleDataUpdate}>update</button>
            <p>title: {content.title}</p>
            <input
              id="input_title"
              type="text"
              defaultValue={content.title}
              onChange={handleOnChange}
            ></input>
            <p>date: {content.date}</p>
            <input
              id="input_date"
              type="text"
              defaultValue={content.date}
              onChange={handleOnChange}
            ></input>
            <p>isShow: {String(content.isShow)}</p>
            <label style={{ color: 'white' }}>
              <input
                id="input_isShow"
                type="radio"
                value={true}
                name="isShow"
                checked={inputIsShow === 'true'}
                onChange={handleOnChange}
              />
              TRUE
            </label>
            <label style={{ color: 'white' }}>
              <input
                id="input_isShow2"
                type="radio"
                value={false}
                name="isShow"
                checked={inputIsShow === 'false'}
                onChange={handleOnChange}
              />
              FALSE
            </label>
            <p>update: {content.update}</p>
            <input
              id="input_update"
              type="text"
              defaultValue={content.update}
              onChange={handleOnChange}
            ></input>
            <p>Category:</p>
            <input
              id="input_category"
              type="text"
              list="list"
              onChange={handleOnChange}
            ></input>
            <datalist id="list">
              <option value="技術提供"></option>
              <option value="ディレクション"></option>
              <option value="プロデュース"></option>
              <option value="講演会"></option>
              <option value="展示会"></option>
              <option value="出演"></option>
              <option value="パフォーマンス"></option>
              <option value="お知らせ"></option>
              <option value="その他"></option>
            </datalist>
            */}
          </div>
        </div>
      ) : (
        <>
          <p style={{ color: 'white', fontSize: '20px', marginLeft: '20px' }}>
            Now loading...
          </p>
        </>
      )}
    </>
  );
}
