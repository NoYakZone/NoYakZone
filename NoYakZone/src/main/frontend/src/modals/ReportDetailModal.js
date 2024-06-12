import React from "react";
import "../CSS/ReportDetailModal.css";

const ReportDetailModal = ({ report, onClose }) => {
  if (!report) return null;

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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-section modal-section-title">
          <h2>{report.title}</h2>
          <p><strong>Date:</strong> {formatDate(report.date)}</p>
        </div>
        <div className="modal-section modal-section-description">
          <p><strong>Description:</strong> {report.text}</p>
        </div>
        {report.link && (
          <div className="modal-section modal-section-link">
            <p><strong>Link:</strong> <a href={report.link} target="_blank" rel="noopener noreferrer">{report.link}</a></p>
          </div>
        )}
        {report.picture && (
          <div className="modal-section modal-section-image">
            <img src={report.picture} alt="Report" />
          </div>
        )}
        <div className="modal-section modal-section-result">
          <p><strong>Result:</strong> {report.result.toLocaleString()}</p>
        </div>
        <div className="modal-section modal-section-checkDrug">
          <p><strong>checkDrug:</strong> {report.checkDrug.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailModal;
