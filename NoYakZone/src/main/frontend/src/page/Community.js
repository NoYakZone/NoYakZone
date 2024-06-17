import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatBot from './ChatBot';
import "../CSS/Community.css";
import { motion, AnimatePresence } from "framer-motion";

const Community = () => {
  const [slangData, setSlangData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSlang, setSelectedSlang] = useState(null);
  const [initial, setInitial] = useState("");
  const [pageGroup, setPageGroup] = useState(0);

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

  const getChosung = (text) => {
    const chosung = [
      'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    return text
      .split('')
      .map(char => {
        const code = char.charCodeAt(0) - 44032;
        if (code < 0 || code > 11171) return char;
        return chosung[Math.floor(code / 588)];
      })
      .join('');
  };

  const filteredSlangData = slangData.filter((slang) => 
    (searchTerm ? slang.word.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
    (initial ? getChosung(slang.word).startsWith(initial) : true)
  );

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSlangData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSlangData.length / itemsPerPage);
  const pagesPerGroup = 5;
  const totalPageGroups = Math.ceil(totalPages / pagesPerGroup);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageGroupChange = (direction) => {
    if (direction === 'next' && pageGroup < totalPageGroups - 1) {
      setPageGroup(pageGroup + 1);
      setCurrentPage((pageGroup + 1) * pagesPerGroup + 1);
    } else if (direction === 'prev' && pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage(pageGroup * pagesPerGroup);
    }
  };

  const handleClick = (slang) => {
    setSelectedSlang(slang);
  };

  const closeModal = () => {
    setSelectedSlang(null);
  };

  const handleInitialSearch = (initial) => {
    setInitial(initial);
    setSearchTerm("");
    setCurrentPage(1);
    setPageGroup(0);
  };

  const renderSlangItems = () => {
    const items = currentItems.map((slang) => (
      <motion.div 
        key={slang.index} 
        className="slang-item" 
        onClick={() => handleClick(slang)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h3>{slang.word}</h3>
      </motion.div>
    ));

    // Fill remaining space with empty items if there are fewer than itemsPerPage
    for (let i = items.length; i < itemsPerPage; i++) {
      items.push(<div key={`empty-${i}`} className="slang-item empty"></div>);
    }

    return items;
  };

  return (
    <div>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          마약 은어 소개 페이지
        </motion.h2>
        <motion.p 
          className="description"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          이 페이지는 마약 은어들을 소개하고, 검색할 수 있는 페이지입니다.
        </motion.p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setInitial("");
              setCurrentPage(1);  // Reset to the first page when search term changes
              setPageGroup(0);
            }}
          />
        </div>
        <div className="initial_search">
          <h4 className="title1">초성 검색</h4>
          <div className="initial_buttons">
            {['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'].map(initial => (
              <button key={initial} onClick={() => handleInitialSearch(initial)}>{initial}</button>
            ))}
          </div>
        </div>
        <div className="slang-list">
          <AnimatePresence>
            {renderSlangItems()}
          </AnimatePresence>
        </div>
        <div className="pagination">
          <button 
            onClick={() => handlePageGroupChange('prev')}
            disabled={pageGroup === 0}
          >
            &lt;
          </button>
          {Array.from({ length: Math.min(pagesPerGroup, totalPages - pageGroup * pagesPerGroup) }, (_, i) => pageGroup * pagesPerGroup + i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePagination(pageNumber)}
              className={pageNumber === currentPage ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
          <button 
            onClick={() => handlePageGroupChange('next')}
            disabled={pageGroup >= totalPageGroups - 1}
          >
            &gt;
          </button>
        </div>
        <AnimatePresence>
          {selectedSlang && (
            <>
              <motion.div 
                className="modal-overlay" 
                onClick={closeModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              ></motion.div>
              <motion.div 
                className="modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="modal-header">
                  <h1>{selectedSlang.word}</h1>
                  <button className="modal-close" onClick={closeModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p>{selectedSlang.detail}</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <ChatBot />
    </div>
  );
};

export default Community;
