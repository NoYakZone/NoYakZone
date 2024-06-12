import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportModal from "../modals/ReportModal";
import ReportDetailModal from "../modals/ReportDetailModal";
import "../CSS/ReportPage.css";
import ChatBot from './ChatBot';

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:7890/report");
      const sortedReports = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setReports(sortedReports);
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

  const openDetailModal = (report) => {
    setSelectedReport(report);
  };

  const closeDetailModal = () => {
    setSelectedReport(null);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const username = localStorage.getItem("username");

  return (
    <div>
    <div className="container">
      <div className="header">
        <h1>신고 내역</h1>
        <button onClick={openModal} className="report-button">
          신고하기
        </button>
      </div>
      <br />
      <br />
      <ul className="reports-list">
        {reports
          .filter((report) => report.userId === username)
          .map((report) => {
            let className = "report-item";
            if (report.result && report.checkDrug) {
              className += " special-report";
            } else if (!report.result && report.checkDrug) {
              className += " not-drug-report";
            }

            return (
              <li
                key={report.index}
                className={className}
                onClick={() => openDetailModal(report)}
              >
                <img src={report.picture || "default-image.jpg"} alt="Report" />
                <div className="report-details">
                  <div className="report-title-date">
                    <h2>{report.title}</h2>
                    <p>{formatDate(report.date)}</p>
                  </div>
                  <p className="report-text">{report.text}</p>
                </div>
              </li>
            );
          })}
      </ul>

      {isModalOpen && (
        <ReportModal onClose={closeModal} refreshReports={fetchReports} />
      )}

      {selectedReport && (
        <ReportDetailModal report={selectedReport} onClose={closeDetailModal} />
      )}
    </div>
      <ChatBot />
    </div>
  );
};

export default ReportPage;
