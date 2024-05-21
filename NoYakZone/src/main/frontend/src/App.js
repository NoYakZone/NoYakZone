import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(`집가고싶다, ${name}!`);
    setName('');
  };

  useEffect(() => {
    fetch("/temp")
      .then((res) => {
        return res.json();
      })
      .then(function (result) {
        setData(result);
      });
  }, []);

  return (
    <div>
      <h1>노약존</h1>
      <form onSubmit={handleSubmit}>
        <label>
          이름 입력　: 　sdfsdf
          <input
            type="text"
            value={name}
            onChange={handleChange}
          />
        </label>
        <button type="submit">확인</button>
      </form>
      {message && <h2>{message}</h2>}
    </div>
  );
}

export default App;
