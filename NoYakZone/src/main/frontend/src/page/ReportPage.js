import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/ReportPage.css";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    userId: "",
    title: "",
    text: "",
    link: "",
    picture: null, // Changed to null since it's a file
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewReport((prevState) => ({
      ...prevState,
      picture: file,
    }));
  };

  // handleSubmit 함수 수정
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = new FormData();

      imageData.append("image", newReport.picture);
      imageData.append("bucketName", "noyakzone");
      imageData.append("key", "report");
      const response = await axios.post(
        "http://localhost:7890/image/uploadImage",
        imageData
      ); // 서버에서 코드를 수정하기
      // 스프링 부트 report 컨트롤러에서 이미지 업로드하고, 리스폰 값 받은 후 DB 에 넣기

      if (response.status === 200) {
        const imageUrl = response.data;
        const formData = new FormData();
        formData.append("userId", newReport.userId);
        formData.append("title", newReport.title);
        formData.append("text", newReport.text);
        formData.append("link", newReport.link);
        formData.append("picture", 'hello');
        await axios.post("http://localhost:7890/report", formData);

        console.log("456");
        fetchReports();

        setNewReport({
          userId: "",
          title: "",
          text: "",
          link: "",
          picture: null,
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  const openModal = () => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("로그인 해주세요.");
      return;
    }
    setNewReport((prevState) => ({
      ...prevState,
      userId: username,
    }));
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h2>신고 페이지</h2>
      <button onClick={openModal}>글쓰기</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <br />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userId"
                value={newReport.userId}
                onChange={handleChange}
                placeholder="User ID"
                required
                readOnly
              />
              <input
                type="text"
                name="title"
                value={newReport.title}
                onChange={handleChange}
                placeholder="신고 제목"
                required
              />
              <textarea
                name="text"
                value={newReport.text}
                onChange={handleChange}
                placeholder="신고 내용"
                required
              ></textarea>
              <input
                type="text"
                name="link"
                value={newReport.link}
                onChange={handleChange}
                placeholder="신고 링크"
              />
              <input
                type="file" // Changed to file input
                accept="image/*" // Accepts all image formats
                name="picture"
                onChange={handleFileChange} // Handle file change event
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default ReportPage;
