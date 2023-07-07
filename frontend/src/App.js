import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useState } from 'react';
import NavBar from "./components/navbar";
import Products from "./components/products";
import Category from './components/category';
import Brand from './components/brand';
import Signup from './components/signup';
import Cart from './components/cart'
import Login from './components/login'
import Profile from './components/profile';
import AddProduct from './components/addproduct';
import Home from './components/home';



function App() {
  const [user,setUser] = useState(null);
  return (
    <>
    <NavBar/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/categories" element={<Category/>}/>
      <Route path="/brands" element={<Brand/>}/>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login user={user} setUser={setUser}/>}></Route>
      <Route path="/profile" element={<Profile setUser={setUser}/>}></Route>
      <Route path="/addproduct" element={<AddProduct/>}></Route>

      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
