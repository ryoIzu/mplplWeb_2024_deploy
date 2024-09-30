'use client';
import { useState, useEffect, useRef, useContext } from 'react';
import '../works.css';
import { db, storage, ref, getDownloadURL } from '../../store/firebaseConfig';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import WorksItems from '../WorksItems';

import { WorksContext } from '@/features/hooks/worksContext/worksContext';

export default function WorksDetail({ params }) {
  const { works, worksInfo, isLoadWorks } = useContext(WorksContext);
  const [content, setContent] = useState();
  const [contents, setContents] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isLoadImg, setIsLoadImg] = useState(false);
  const [hideInfoArea, setHideInfoArea] = useState(false);
  const moreInfoRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoadWorks === true) {
      works.sort((a, b) => {
        return b.update - a.update;
      });
      setContents(works);
      works.map((work) => {
        if (work.id === params.worksID) {
          setContent(work);
          setIsLoad(true);
        }
      });
    }
  }, [isLoadWorks]);

  useEffect(() => {
    if (isLoad) {
      setTimeout(() => {
        setIsVisible(true);
      }, 100); //
    }
  }, [isLoad]);

  useEffect(() => {
    const handleScroll = () => {
      if (moreInfoRef.current) {
        const moreInfoPosition =
          moreInfoRef.current.getBoundingClientRect().top;
        if (moreInfoPosition <= 800) {
          setHideInfoArea(true);
        } else {
          setHideInfoArea(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isLoad ? (
        <>
          <div className={`fade-in-detail ${isVisible ? 'visible' : ''}`}>
            <div className={`info_area ${hideInfoArea ? 'hidden' : ''}`}>
              <h2>{content.title}</h2>
              <p>Date: {content.date}</p>
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
                          content.description.entityMap[
                            block.entityRanges[0].key
                          ].data.url
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
              <p>Credit:</p>
              {Object.keys(content.credit).length != false ? (
                content.credit.blocks.map((block) => {
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
                          content.description.entityMap[
                            block.entityRanges[0].key
                          ].data.url
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
            </div>

            <div className="content_area">
              <div className="img_area">
                {content.videoURLs.length > 0 ? (
                  <>
                    <div className="youtube_video">
                      {content.videoURLs.map((videoURL, index) => {
                        return (
                          <div
                            key={index}
                            dangerouslySetInnerHTML={{
                              __html: videoURL,
                            }}
                          />
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {content.imgURLs.map((imgURL, index) => {
                  return (
                    <Image
                      key={`${imgURL}_${index}`}
                      src={imgURL}
                      width={1280}
                      height={720}
                      layout="responsive"
                      alt={content.imgDir}
                      style={{ objectFit: 'cover', width: '100%' }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="spacer" style={{ height: '200px' }}></div>
            <div className="spacer">
              <hr />
            </div>

            <div className="moreInfo_area" ref={moreInfoRef}>
              <h1>MORE WORKS</h1>
              <div className="spacer" />
              <Container
                fluid
                style={{ width: '100%', padding: '0px', margin: '0px' }}
              >
                {contents.reduce((acc, _, index) => {
                  if (index % 3 === 0) {
                    const itemsInRow = [];
                    for (let i = 0; i < 3; ++i) {
                      const contextIndex = contents.length - 1 - index - i;
                      if (contextIndex >= 0) {
                        itemsInRow.push(
                          <WorksItems
                            key={contextIndex}
                            key_0={contextIndex}
                            link_0={`../${contents[contextIndex].imgDir}/`}
                            imageURL_0={contents[contextIndex].imgURLs[0]}
                            alt_0={contents[contextIndex].imgDir}
                            title_0={contents[contextIndex].title}
                          />,
                        );
                      }
                    }
                    if (itemsInRow.length > 0) {
                      acc.push(<Row key={index}>{itemsInRow}</Row>);
                    }
                  }
                  return acc;
                }, [])}
              </Container>
            </div>
          </div>
        </>
      ) : (
        <p style={{ color: 'white', fontSize: '20px', marginLeft: '20px' }}>
          Now loading...
        </p>
      )}
    </>
  );
}
