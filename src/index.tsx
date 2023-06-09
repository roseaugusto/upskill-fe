import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import Registration from './pages/Registration';
import ThankYou from './pages/ThankYou';
import UserInformation from './pages/UserInformation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/thank-you/:id' element={<ThankYou />} />
        <Route path='/user-information/:id' element={<UserInformation />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
