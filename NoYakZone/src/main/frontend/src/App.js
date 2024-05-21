// App.js
import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; // Routes 대신에 Route를 import 합니다.


import MainPage from './page/MainPage';
import About from './page/About';
import Community from './page/Community';
import SignUpPage from './page/SignUpPage';
import Footer from './component/Footer';
import Navigate from './component/Navigate';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigate/>
                
                {/* 각 경로에 대한 Route 컴포넌트를 사용합니다. */}
                <Route exact path="/" component={MainPage} />       
                <Route path="/About" component={About} />
                <Route path="/Community" component={Community} />
                <Route path="/signUp" component={SignUpPage} />
                
                <footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
