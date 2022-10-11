import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import EmailConfirm from './EmailConfirm';
import Reset from './Reset';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='home' element={<Home />} />
      <Route path='admin' element={<Admin />} />
      <Route path='signup' element ={<SignUp />} />
      <Route path='forgotpassword' element = {<ForgotPassword />}/>
      <Route path='emailconfirm' element = {<EmailConfirm/>}/>
      <Route path='reset' element = {<Reset/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
