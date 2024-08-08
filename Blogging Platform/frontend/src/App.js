import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexComponent from './components/IndexComponent';
import NavbarComponent from './components/NavbarComponent';
import HomeComponent from './components/HomeComponent';
import PostComponent from './components/PostComponent';
import CategoryComponent from './components/CategoryComponent';
import CpostComponent from './components/CpostComponent';
import SignupComponent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';
import NewPostComponent from './components/NewPostComponent';
import ProfileComponent from './components/ProfileComponent';
import MyPostsComponent from './components/MyPostsComponent';
import ViewCatergoryComponent from './components/ViewCategoryComponent';

function App() {  
  const [userData, setUserData] = useState('');
  const [category, setCategory] = useState(null);
  const [loggedIn, isLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <LoginComponent setUserData={setUserData} userData={userData} />
            </>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <>
              <SignupComponent setUserData={setUserData} userData={userData} />
            </>
          }
        ></Route>
        <Route
          path="/newpost"
          element={
            <>
              <NavbarComponent loggedIn={isLoggedIn} setSearchQuery={setSearchQuery} />
              <NewPostComponent />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <NavbarComponent loggedIn={isLoggedIn} setSearchQuery={setSearchQuery} />
              <CategoryComponent setCategory={setCategory} />
            </>
          }
        />
        <Route
          path="/cpost"
          element={
            <>
              <NavbarComponent loggedIn={isLoggedIn} setSearchQuery={setSearchQuery} />
              <CpostComponent category={category} />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <NavbarComponent loggedIn={isLoggedIn} setSearchQuery={setSearchQuery} />
              <HomeComponent searchQuery={searchQuery} />
            </>
          }
        />
        <Route
          path="/post/:id"
          element={
            <>
              <NavbarComponent loggedIn={isLoggedIn} setSearchQuery={setSearchQuery} />
              <PostComponent userData={userData} />
            </>
          }
        />

        <Route path="/" element={<IndexComponent />} />
        <Route
          path="/profile"
          element={
            <>
              <NavbarComponent loggedIn={isLoggedIn} setSearchQuery={setSearchQuery} />
              <ProfileComponent
                setUserData={setUserData}
                userData={userData}
                loggedIn={isLoggedIn}
              />
            </>
          }
        />
        <Route
          path="/myposts"
          element={
            <>
              <NavbarComponent setSearchQuery={setSearchQuery} />
              <MyPostsComponent userData={userData} searchQuery={searchQuery} />
            </>
          }
        />
        <Route
          path="/cat"
          element={<ViewCatergoryComponent setCategory={setCategory} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
