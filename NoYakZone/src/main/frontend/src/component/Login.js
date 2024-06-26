import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7890/userData/login",
        { id, password }
      );
      console.log(response);
      const { data } = response;

      if (response.status === 200) {
        const official = data.includes("수사자");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", id);
        localStorage.setItem("official", official.toString());
        onLogin(id);
        window.location.reload();//페이지 새로고침
      } else {
        setErrorMessage("로그인 실패: " + data);
      }
    } catch (error) {
      setErrorMessage("아이디, 비밀번호를 다시 한번 확인해주세요");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
