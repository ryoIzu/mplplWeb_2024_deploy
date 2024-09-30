"use client";
import "../news.css";
import MyEditor from "../../components/layouts/Editor/Editor";
import { NewsContext } from "@/features/hooks/newsContext/newsContext";
import { useContext, useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useParams, useSearchParams } from "next/navigation";
import { slice } from "draft-js/lib/DefaultDraftBlockRenderMap";
import { Suspense } from "react";

export default function News() {
  const { news, isLoad, newsInfo } = useContext(NewsContext);
  const [isSort, setIsSort] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const pageNum = parseInt(searchParams.get("pageNum"), 10);
  const [lastPage, setLastPage] = useState(parseInt(0, 10));
  const showNewsNum = parseInt(10, 10);
  const [slicedNews, setSlicedNews] = useState([]);

  useEffect(() => {
    if (isLoad == true) {
      //sort with news.update
      news.sort((a, b) => {
        return b.update - a.update;
      });
      setSlicedNews(news.slice((pageNum - 1) * 10, (pageNum - 1) * 10 + 10));
      console.log(parseFloat(newsInfo.amount / showNewsNum, 10));
      setLastPage(Math.ceil(newsInfo.amount / showNewsNum, 10));
      setIsSort(true);
    }
  }, [isLoad]);

  useEffect(() => {
    console.log(lastPage);
  }, [lastPage]);

  const handleClickPagination = () => {
    console.log("clicked");
  };

  useEffect(() => {
    const items = document.querySelectorAll(".div_content");
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("fade-in");
      }, index * 200); // 200msごとに次の要素をフェードイン
    });
  }, [slicedNews]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ height: "50px" }}></div>
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
                        href={`./${a_news.date}?index=${(pageNum - 1) * showNewsNum + index}`}
                      >
                        {a_news.title}
                      </a>
                      <br />
                      <a
                        href={`./${a_news.date}?index=${(pageNum - 1) * showNewsNum + index}`}
                      >
                        more info...
                      </a>
                    </div>
                  </div>
                );
              }
              return null;
            })}
            <Pagination className="custom-pagination">
              <Pagination.First
                className="custom-pagination-item"
                href={`./page?pageNum=1`}
              />
              {pageNum === 1 ? (
                <>
                  <Pagination.Item
                    active={true}
                    className="custom-pagination-item"
                  >
                    {pageNum}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum + 1}`}
                  >
                    {pageNum + 1}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    disabled={true}
                  >
                    ...
                  </Pagination.Item>
                  <Pagination.Next
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum + 1}`}
                  >
                    Next
                  </Pagination.Next>
                </>
              ) : pageNum === 2 ? (
                <>
                  <Pagination.Prev
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum - 1}`}
                  >
                    Prev
                  </Pagination.Prev>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum - 1}`}
                  >
                    {pageNum - 1}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum}`}
                    active={true}
                    disabled={true}
                  >
                    {pageNum}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum + 1}`}
                  >
                    {pageNum + 1}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    disabled={true}
                  >
                    ...
                  </Pagination.Item>
                  <Pagination.Next
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum + 1}`}
                  >
                    Next
                  </Pagination.Next>
                </>
              ) : pageNum > 2 && pageNum < lastPage - 1 ? (
                <>
                  <Pagination.Prev
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum - 1}`}
                  >
                    Prev
                  </Pagination.Prev>
                  <Pagination.Item
                    className="custom-pagination-item"
                    disabled={true}
                  >
                    ...
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum - 1}`}
                  >
                    {pageNum - 1}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    active={true}
                  >
                    {pageNum}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum + 1}`}
                  >
                    {pageNum + 1}
                  </Pagination.Item>
                  <Pagination.Item className="custom-pagination-item">
                    ...
                  </Pagination.Item>
                  <Pagination.Next
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum + 1}`}
                  >
                    Next
                  </Pagination.Next>
                </>
              ) : pageNum === lastPage - 1 ? (
                <>
                  <Pagination.Prev
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum - 1}`}
                  >
                    Prev
                  </Pagination.Prev>
                  <Pagination.Item
                    className="custom-pagination-item"
                    disabled={true}
                  >
                    ...
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum - 1}`}
                  >
                    {pageNum - 1}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    active={true}
                  >
                    {pageNum}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum + 1}`}
                  >
                    {pageNum + 1}
                  </Pagination.Item>
                  <Pagination.Next
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum + 1}`}
                  >
                    Next
                  </Pagination.Next>
                </>
              ) : pageNum === lastPage ? (
                <>
                  <Pagination.Prev
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum - 1}`}
                  >
                    Prev
                  </Pagination.Prev>
                  <Pagination.Item
                    className="custom-pagination-item"
                    disabled={true}
                  >
                    ...
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    href={`./page?pageNum=${pageNum - 1}`}
                  >
                    {pageNum - 1}
                  </Pagination.Item>
                  <Pagination.Item
                    className="custom-pagination-item"
                    active={true}
                  >
                    {pageNum}
                  </Pagination.Item>
                </>
              ) : (
                <></>
              )}

              <Pagination.Last
                className="custom-pagination-item"
                href={`./page?pageNum=${Math.ceil(newsInfo.amount / showNewsNum, 10)}`}
              />
            </Pagination>
          </>
        ) : (
          <></>
        )}
      </Suspense>
    </>
  );
}
