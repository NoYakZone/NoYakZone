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

  const username = localStorage.getItem("username");

  return (
    <div className="container">
      <h1>신고 내역</h1>
      <button onClick={openModal}>신고하기</button>

      <h3>Reports</h3>
      <ul className="reports-list">
        {reports
          .filter((report) => report.userId === username)
          .map((report) => (
            <li key={report.index}>
              <h2>{report.title}</h2>
              <p>{report.text}</p>
              <p>{new Date(report.date).toLocaleString()}</p>
              <p>{report.link && <a href={report.link}>{report.link}</a>}</p>
              <p>
                {report.picture && <img src={report.picture} alt="Report" />}
              </p>
              <p>{report.result.toLocaleString()}</p>
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
