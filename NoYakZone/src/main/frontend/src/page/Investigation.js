import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InvestigationDetailModal from "../modals/InvestigationDetailModal";
import Prompt from "./Prompt";
import "../CSS/Investigation.css";

function Investigation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOfficial, setIsOfficial] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCrawling, setIsCrawling] = useState(false);
  const postsPerPage = 10;
  const history = useHistory();

  useEffect(() => {
    const officialStatus = localStorage.getItem("official");
    setIsOfficial(officialStatus === "true");
  }, []);

  useEffect(() => {
    if (isOfficial) {
      fetch("/api/endpoint")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const filteredData = data.filter((item) => item.official);
          setData(filteredData);
          setSearchResults(filteredData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });

      fetch("http://localhost:7890/board") // API endpoint for fetching posts
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const sortedPosts = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setPosts(sortedPosts);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [isOfficial]);

  const handleSearch = () => {
    setIsCrawling(true);
    fetch("http://116.125.97.34:9090/start_crawling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: searchTerm }),
    })
      .then(() => {
        setTimeout(() => {
          setIsCrawling(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error starting crawling:", error);
        setIsCrawling(false);
      });
  };

  const openModal = (item) => {
    setModalContent(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  if (!isOfficial) {
    return (
      <div className="access-denied">
        <h1>접근 거부</h1>
        <p>이 페이지를 볼 수 있는 권한이 없습니다.</p>
        <button onClick={() => history.push("/")}>홈으로 이동</button>
      </div>
    );
  }

  if (loading) {
    return <div>로딩 중...</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="investigation-container">
        <div className="header">
          <h1 className="ReportHeader">신고 내역</h1>
          <div className="descriptionIN">
            <p>이 페이지의 주요 기능은 크롤링을 통해 마약수사를 하는 분들께 도움을 드리기 위해 만든 페이지 입니다.</p>
            <p>각종 사이트를 알아보지 않아도 크롤링을 통해 은어가 있는 키워드를 찾아줍니다.</p>
            <p>이를 통해, 사용자들에게 더 깨끗하고 안전한 인터넷 환경을 제공하고자 합니다.</p>
          </div>
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="검색..."
            />
            <button onClick={handleSearch}>검색</button>
          </div>
        </div>
        <div className="content">
          {isCrawling ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <>
              <ul>
                {searchResults.map((item) => (
                  <li key={item.id} onClick={() => openModal(item)}>
                    {item.name}
                  </li>
                ))}
              </ul>
              <div className="posts-container">
                <h2>게시물</h2>
                <ul>
                  {currentPosts.map((post) => (
                    <li key={post.index} onClick={() => openModal(post)}>
                      <div>
                        <strong>
                          {post.text.length > 100
                            ? post.text.substring(0, 100) + "..."
                            : post.text}
                        </strong>
                      </div>
                      <div>{post.place}</div>
                      <div>{new Date(post.date).toLocaleDateString()}</div>
                      <div>{new Date(post.date).toLocaleString()}</div>
                      {post.picture && (
                        <div>
                          <img src={post.picture} alt={post.text} />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </>
          )}
        </div>
        <InvestigationDetailModal
          isOpen={modalOpen}
          onClose={closeModal}
          content={modalContent}
        />
      </div>
      <Prompt />
    </div>
  );
}

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (endPage - startPage < 4) {
    if (currentPage < 5) {
      endPage = Math.min(startPage + 4, totalPages);
    } else if (currentPage > totalPages - 4) {
      startPage = Math.max(totalPages - 4, 1);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {startPage > 1 && (
          <>
            <li className="page-item">
              <a onClick={() => paginate(1)} className="page-link">
                1
              </a>
            </li>
            {startPage > 2 && <li className="page-item">...</li>}
          </>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <li className="page-item">...</li>}
            <li className="page-item">
              <a onClick={() => paginate(totalPages)} className="page-link">
                {totalPages}
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Investigation;
