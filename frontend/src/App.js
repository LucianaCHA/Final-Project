import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Banner from "./Components/Banner/Banner";
import HomeCharacter from "./Components/HomeComponent/HomeCharacter/HomeCharacter";
import HomeComics from "./Components/HomeComponent/HomeComic/HomeComics";
import DetailComic from "./Components/Details/DetailComic/DetailComic"
import DetailCharacter from "./Components/Details/DetailCharacter/DetailCharacter"
import Login from "./Components/Login/Login.jsx";
import NavBar from "./Components/Navbar/Navbar";

import CharactersIcon from "./Pages/CharactersIcon/CharactersIcon"
import ComicsIcon from "./Pages/ComicsIcon/ComicsIcon"
import SearchIcon from "./Components/Navbar/MainNav";
import SimpleBottomNavigation from "./Components/Navbar/MainNav"

import { ThemeProvider } from '@mui/material/styles'
import theme from "./Styles/Styles";
import './index.css';
import SearchBarComics from "./Components/SearchBar/SearchBarComics/SearchBarComics";
import SearchBarCharacters from "./Components/SearchBar/SearchBarCharacters/SearchBarCharacters";
import SearchPrueba from "./Components/SearchBar/SearchBarComics/SearchPrueba";
import Admin from "./Components/Admin/Admin";
import "./App.css";
import { Container } from "@material-ui/core";
import FormAdmin from "./Components/Form/FormAdmin";
import  Lecture from "./Components/Lecture/Lecture";
import { Profile } from "./Components/Login/Profile";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <div className="app">
        <Container>
        <Routes>
          <Route path='/' element={<Banner />} />
          <Route path='/homeCharacter' element={<HomeCharacter />} />
          <Route path='/homeComics' element={<HomeComics />} />
          <Route path='/homeComics/DetailComic/:id' element={<DetailComic />} />
          <Route path='/homeCharacter/DetailCharacter/:id' element={<DetailCharacter />} />
          <Route path='/formAdmin' element={<FormAdmin />} />
          <Route path='/' element={<NavBar />} />
{/* 
          <Route path='/homeCharacter' element={<CharactersIcon />} />
          <Route path='/' element={<SearchIcon />} />
          <Route path='/homeComics' element={<ComicsIcon />} /> */}
          <Route exact path='/lecture' element={<Lecture />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/searchComics' element={<SearchBarComics />} />
          <Route path='/searchCharacter' element={<SearchBarCharacters />} />
          <Route path='/searchPrueba' element={<SearchPrueba />} />
          

          <Route path='/admin' element={<Admin/>} />

      </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation />

      </BrowserRouter>
   

    </ThemeProvider>
  );
}


export default App;



