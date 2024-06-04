import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../CSS/Investigation.css';

function Investigation() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOfficial, setIsOfficial] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const officialStatus = localStorage.getItem('official');
        if (officialStatus === 'true') {
            setIsOfficial(true);
        } else {
            setIsOfficial(false);
        }
    }, []);

    useEffect(() => {
        if (isOfficial) {
            fetch('/api/endpoint') // Replace with your API endpoint
                .then(response => response.json())
                .then(data => {
                    const filteredData = data.filter(item => item.official === true);
                    setData(filteredData);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        }
    }, [isOfficial]);

    if (!isOfficial) {
        return (
            <div className="access-denied">
                <h1>Access Denied</h1>
                <p>You do not have the required permissions to view this page.</p>
                <button onClick={() => history.push('/')}>Go to Home</button>
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="investigation-container">
            <h1>Official Items</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <Link to={`/details/${item.id}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Investigation;
