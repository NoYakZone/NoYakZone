import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../CSS/InvestigationDetailModal.css";

const InvestigationDetailModal = ({ isOpen, onClose, content }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!content) return null;

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Investigation Detail Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <h2>Details</h2>
          <div className="detail-section">
            <div className="detail-item">
              <strong>Content:</strong>
              <div className="scrollable-text expanded">{content.text}</div>
            </div>
            <div className="detail-item">
              <strong>Place:</strong> {content.place}
            </div>
            <div className="detail-item">
              <strong>Date:</strong> {formatDate(content.date)}
            </div>
            {content.picture && (
              <div className="detail-item">
                <strong>Picture:</strong>{" "}
                <img src={content.picture} alt={content.text} />
              </div>
            )}
            <div className="detail-item">
              <strong>URL:</strong>{" "}
              <a href={content.url} target="_blank" rel="noopener noreferrer">
                {content.url}
              </a>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default InvestigationDetailModal;
