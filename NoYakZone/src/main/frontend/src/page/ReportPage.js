// ReportPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportModal from "../modals/ReportModal";
import "../CSS/ReportPage.css";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:7890/report");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const openModal = () => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("로그인 해주세요.");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h2>신고 페이지</h2>
      <button onClick={openModal}>글쓰기</button>

      <h3>Reports</h3>
      <ul className="reports-list">
        {reports.map((report) => (
          <li key={report.index}>
            <h4>{report.title}</h4>
            <p>{report.text}</p>
            <p>
              {report.userId} - {new Date(report.date).toLocaleString()}
            </p>
            {report.link && <a href={report.link}>Link</a>}
            {report.picture && <img src={report.picture} alt="Report" />}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <ReportModal onClose={closeModal} refreshReports={fetchReports} />
      )}
    </div>
  );
};

export default ReportPage;
