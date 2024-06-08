import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Community.css";
import ChatBot from './ChatBot';

const Community = () => {
  const [slangData, setSlangData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSlang, setSelectedSlang] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7890/patter");
        setSlangData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredSlangData = slangData.filter((slang) =>
    slang.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSlangData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSlangData.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClick = (slang) => {
    setSelectedSlang(slang);
  };

  const closeModal = () => {
    setSelectedSlang(null);
  };

  const renderSlangItems = () => {
    const items = currentItems.map((slang) => (
      <div key={slang.index} className="slang-item" onClick={() => handleClick(slang)}>
        <h3>{slang.word}</h3>
      </div>
    ));

    // Fill remaining space with empty items if there are fewer than itemsPerPage
    for (let i = items.length; i < itemsPerPage; i++) {
      items.push(<div key={`empty-${i}`} className="slang-item empty"></div>);
    }

    return items;
  };

  return (
    <div className="container">
      <h2>마약 은어 소개 페이지</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);  // Reset to the first page when search term changes
          }}
        />
      </div>
      <div className="slang-list">
        {renderSlangItems()}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
            className={pageNumber === currentPage ? "active" : ""}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {selectedSlang && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <div className="modal-header">
              <h1>{selectedSlang.word}</h1>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>{selectedSlang.detail}</p>
            </div>
          </div>
        </>
      )}
      <ChatBot id={"qwer"}/>
    </div>
  );
};

export default Community;
