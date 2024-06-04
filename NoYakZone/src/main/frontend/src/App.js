import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainPage from './page/MainPage';
import About from './page/About';
import Community from './page/Community';
import Footer from './component/Footer';
import Navigate from './component/Navigate';
import MemberChoice from './page/MemberChoice';
import SignUpGeneral from './page/SignUpGeneral';
import SignUpPolice from './page/SignUpPolice';
import CheckList from './page/CheckList';
import FindId from './page/FindId';
import FindPassword from './page/FindPassword';

function App() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <Navigate />
                <div className="content-wrap">
                    <Route exact path="/" component={MainPage} />
                    <Route path="/About" component={About} />
                    <Route path="/Community" component={Community} />
                    <Route path="/MemberChoice" component={MemberChoice} />
                    <Route path="/signUpPolice" component={SignUpPolice} />
                    <Route path="/signUpGeneral" component={SignUpGeneral} />
                    <Route path="/CheckList" component={CheckList} />
                    <Route path="/findPassword" component={FindPassword} />
                    <Route path="/findId" component={FindId} />

                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
