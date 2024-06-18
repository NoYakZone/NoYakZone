import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaBan } from 'react-icons/fa';
import ReportModal from "../modals/ReportModal";
import ReportDetailModal from "../modals/ReportDetailModal";
import "../CSS/ReportPage.css";
import ChatBot from './ChatBot';

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("로그인이 필요한 서비스입니다. 로그인해주세요.");
    } else {
      fetchReports();
    }
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
      alert("로그인이 필요한 서비스입니다. 로그인해주세요.");
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
        <div className="description">
          <p>이 페이지의 주요 기능은 사용자가 신고한 내용을 AI가 1차로 분석하여 마약 관련 여부를 판별하는 것입니다.</p>
          <p>이후, 수사 전문가가 2차 검토를 통해 해당 사이트가 마약 관련 사이트인지 최종 확인합니다. 이를 통해, 사용자들에게 더 깨끗하고 안전한 인터넷 환경을 제공하고자 합니다.</p>
        </div>
        <ul className="reports-list">
          {reports
            .filter((report) => report.userId === username)
            .map((report) => {
              let className = "report-item";
              if (report.result && report.checkDrug) {
                className += " special-report";
              } else if (!report.result && report.checkDrug) {
                className += " not-drug-report";
              } else if (report.result !== report.checkDrug) {
                className += " different-values-report";
              }

              if (!report.result) {
                className += " result-false";
              }

              return (
                <li
                  key={report.index}
                  className={className}
                  onClick={() => openDetailModal(report)}
                >
                  <div className="report-icon">
                    {report.result && report.checkDrug ? (
                      <FaCheckCircle className="icon-check" />
                    ) : (
                      <FaBan className="icon-ban" />
                    )}
                  </div>
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
