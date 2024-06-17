import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../modals/InvestigationDetailModal";
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
  const postsPerPage = 10;
  const history = useHistory();

  useEffect(() => {
    const officialStatus = localStorage.getItem("official");
    setIsOfficial(officialStatus === "true");
  }, []);

  useEffect(() => {
    if (isOfficial) {
      fetch("/api/endpoint") // Replace with your API endpoint
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
    fetch("http://116.125.97.34:9090/start_crawling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: searchTerm }),
    });
    alert("크롤링 시작");
  };

  const openModal = (item) => {
    setModalContent(item);
    console.log("모달이 켜진다");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    console.log("모달이 꺼진다");
    setModalContent(null);
  };

  if (!isOfficial) {
    return (
      <div className="access-denied">
        <h1>Access Denied</h1>
        <p>You do not have the required permissions to view this page.</p>
        <button onClick={() => history.push("/")}>Go to Home</button>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="investigation-container">
      <div className="header">
        <h1>　</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="content">
        <div className="posts-container">
          <h2>Posts</h2>
          <ul>
            {currentPosts.map((post) => (
              <li key={post.index}>
                onClick={() => openModal(post)}
                <div>
                  <strong>
                    {post.text.length > 100
                      ? post.text.substring(0, 100) + "..."
                      : post.text}
                  </strong>
                </div>
                <div>{post.place}</div>
                <div>{new Date(post.date).toLocaleDateString()}</div>
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
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {modalContent && (
          <div>
            <h2>{modalContent.name}</h2>
            <p>{modalContent.description}</p>
          </div>
        )}
      </Modal>
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
