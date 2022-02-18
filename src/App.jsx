/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';

import Login from './components/features/Login/Login.jsx';
import PendingApproval from './components/features/PendingApproval/PendingApproval.jsx';
import Register from './components/features/Register/Register.jsx';
import AsideMenu from './components/Layout/AsideMenu/AsideMenu.jsx';
import CompanyInfo from './components/Layout/CompanyInfo/CompanyInfo.jsx';
import MainContent from './components/Layout/MainContent/MainContent.jsx';
import MyProfile from './components/Layout/MyProfile/MyProfile.jsx';
import Questions from './components/Layout/Questions/Questions.jsx';
import Team from './components/Layout/Team/Team.jsx';
import TopBar from './components/Layout/Topbar/TopBar.jsx';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';

import CreateQuestion from 'components/features/CreateQuestion/CreateQuestion';
import Answers from 'components/Layout/Answers/Answers';
import { useAuthContext } from 'context/AuthContext.jsx';

function App() {
  const { isUserLoggedIn } = useAuthContext();

  return (
    <Fragment>
      {isUserLoggedIn && <TopBar />}
      {isUserLoggedIn && <AsideMenu />}
      <MainContent>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/pending-approval"
            element={
              <ProtectedRoute>
                <PendingApproval />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-info"
            element={
              <ProtectedRoute>
                <CompanyInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/question"
            element={
              <ProtectedRoute>
                <CreateQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/question"
            element={
              <ProtectedRoute>
                <CreateQuestion simplified />
              </ProtectedRoute>
            }
          />
          <Route
            path="/q&a"
            element={
              <ProtectedRoute>
                <Answers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainContent>
    </Fragment>
  );
}

export default App;
