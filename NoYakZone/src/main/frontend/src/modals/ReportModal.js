// ReportModal.js
import React, { useState } from "react";
import axios from "axios";
import "../CSS/ReportModal.css";

const ReportModal = ({ onClose, refreshReports }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const username = localStorage.getItem("username");
    console.log("username : " + username);

    formData.append("userId", username);
    formData.append("title", title);
    formData.append("text", text);
    formData.append("link", link);
    formData.append("picture", picture);

    try {
      await axios.post("http://localhost:7890/report", formData);
      refreshReports();
      onClose();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>New Report</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Text:
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </label>
          <label>
            Link:
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
          <label>
            Picture:
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files[0])}
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
