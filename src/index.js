import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetailsPage from './pages/BookDetailsPage'
import BooksPage from './pages/BooksPage'
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AuthorDetailsPage from './pages/AuthorDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import AuthorsPage from './pages/AuthorsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//   {element}
//   </BrowserRouter>);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<BooksPage />} />
        <Route path='/books'>
          <Route path=":bookId" element={<BookDetailsPage />} />
        </Route>
        <Route path='/authors'>
          <Route index element={<AuthorsPage />} />
          <Route path=":authorId" element={<AuthorDetailsPage />} />
        </Route>
        <Route path='/author/:authorId' element={<AuthorDetailsPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
      </Route>
      <Route path='/login' element={<App />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path='/register' element={<RegistrationPage />} />
    </Routes>
  </BrowserRouter >);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
