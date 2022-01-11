/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';

import Login from './components/features/Login/Login.jsx';
import PendingApproval from './components/features/PendingApproval/PendingApproval.jsx';
import Register from './components/features/Register/Register.jsx';
import AsideMenu from './components/Layout/AsideMenu/AsideMenu.jsx';
import CompanyInfo from './components/Layout/CompanyInfo/CompanyInfo.jsx';
import MyProfile from './components/Layout/MyProfile/MyProfile.jsx';
import Questions from './components/Layout/Questions/Questions.jsx';
import Team from './components/Layout/Team/Team.jsx';
import TopBar from './components/Layout/Topbar/TopBar.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

import MainContent from 'components/Layout/MainContent/MainContent.jsx';
import { useAuthContext } from 'context/AuthContext.jsx';

function App() {
  // eslint-disable-next-line no-unused-vars
  // const { isLoggedIn } = useAuthContext();
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {/* {isLoggedIn && <TopBar />}
        {isLoggedIn && <AsideMenu />} */}
        <TopBar />
        <AsideMenu />
        <MainContent>
          <Routes>
            <Route path="/" element={<PendingApproval />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/company-info" element={<CompanyInfo />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/team" element={<Team />} />
            <Route path="/pending-approval" element={<PendingApproval />} />
            <Route path="/my-profile" element={<MyProfile />} />
          </Routes>
        </MainContent>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
// style={{ padding: ' 0 15rem ' }}
