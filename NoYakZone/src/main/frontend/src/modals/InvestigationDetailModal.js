import React from "react";
import Modal from "react-modal";
import "../CSS/InvestigationDetailModal.css";

const InvestigationDetailModal = ({ isOpen, onClose, content }) => {
  if (!content) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Investigation Detail Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <h2>Details</h2>
      <div className="detail-section">
        <div className="detail-item">
          <strong>Name:</strong> {content.name}
        </div>
        <div className="detail-item">
          <strong>Text:</strong>
          <div className="scrollable-text">{content.text}</div>
        </div>
        <div className="detail-item">
          <strong>Place:</strong> {content.place}
        </div>
        <div className="detail-item">
          <strong>Date:</strong> {new Date(content.date).toLocaleString()}
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
      <div className="modal-footer"></div>
    </Modal>
  );
};

export default InvestigationDetailModal;
