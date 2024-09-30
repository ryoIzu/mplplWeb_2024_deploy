'use client';
import './news.css';
import MyEditor from '../components/layouts/Editor/Editor';
import { NewsContext } from '@/features/hooks/newsContext/newsContext';
import { useContext, useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';

export default function News() {
  const { news, isLoad, newsInfo } = useContext(NewsContext);
  const [isSort, setIsSort] = useState(false);
  const [lastPage, setLastPage] = useState(parseInt(0, 10));
  const showNewsNum = parseInt(10, 10);
  const [slicedNews, setSlicedNews] = useState([]);

  useEffect(() => {
    if (isLoad === true) {
      //sort with news.update
      news.sort((a, b) => {
        return b.update - a.update;
      });
      setSlicedNews(
        news.slice((1 - 1) * showNewsNum, (1 - 1) * showNewsNum + showNewsNum),
      );
      console.log(newsInfo.amount);
      console.log(parseFloat(parseFloat(newsInfo.amount) / showNewsNum, 10));
      setLastPage(Math.ceil(newsInfo.amount / showNewsNum, 10));
      setIsSort(true);
    }
  }, [isLoad]);

  const handleClickPagination = () => {
    console.log('clicked');
  };

  useEffect(() => {
    const items = document.querySelectorAll('.div_content');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('fade-in');
      }, index * 200); // 200msごとに次の要素をフェードイン
    });
  }, [slicedNews]);

  return (
    <>
      <div style={{ height: '50px' }}></div>
      {isSort ? (
        <>
          {slicedNews.map((a_news, index) => {
            if (a_news.isShow) {
              return (
                <div key={a_news.date} className="div_content">
                  <div className="div_date">
                    <p>
                      {a_news.date.slice(0, 4)}.{a_news.date.slice(4, 6)}.
                      {a_news.date.slice(6, 8)}
                    </p>
                  </div>
                  <div className="div_info">
                    <a
                      id="title"
                      href={`./news/${a_news.date}?index=${(1 - 1) * showNewsNum + index}`}
                    >
                      {a_news.title}
                    </a>
                    <br />
                    <a
                      href={`./news/${a_news.date}?index=${(1 - 1) * showNewsNum + index}`}
                    >
                      more info...
                    </a>
                  </div>
                </div>
              );
            }
            return null;
          })}
          <div className="d-flex justify-content-center my-3">
            <Pagination className="custom-pagination">
              <Pagination.First
                className="custom-pagination-item"
                href={`./news/page?pageNum=1`}
              />
              <Pagination.Item active={true} className="custom-pagination-item">
                {1}
              </Pagination.Item>
              <Pagination.Item
                className="custom-pagination-item"
                href={`./news/page?pageNum=${2}`}
              >
                {2}
              </Pagination.Item>
              <Pagination.Item
                className="custom-pagination-item"
                disabled={true}
              >
                ...
              </Pagination.Item>
              <Pagination.Next
                className="custom-pagination-item"
                href={`./news/page?pageNum=${2}`}
              >
                Next
              </Pagination.Next>
              <Pagination.Last
                className="custom-pagination-item"
                href={`./news/page?pageNum=${Math.ceil(newsInfo.amount / showNewsNum, 10)}`}
              />
            </Pagination>
          </div>
        </>
      ) : (
        <>
          <p style={{ color: 'white', fontSize: '20px', marginLeft: '100px' }}>
            Now loading...
          </p>
        </>
      )}
    </>
  );
}
