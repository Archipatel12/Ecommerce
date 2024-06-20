import React from 'react';
import './App.css';
import Navbar from './Componenets/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Componenets/Footer/Footer';
import Menbanner from './Componenets/Assets/banner_mens.png'
import womenbanner from './Componenets/Assets/banner_women.png'
import kidsbanner from './Componenets/Assets/banner_kids.png'



function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}></Route>
        <Route path='/mens' element={<ShopCategory banner={Menbanner} category="men"/>}></Route>
        <Route path='/womens' element={<ShopCategory banner={womenbanner} category="women"/>}></Route>
        <Route path='/kids' element={<ShopCategory banner={kidsbanner} category="kid"/>}></Route>
        <Route path='/product' element={<Product/>}/>
        <Route path='/product/:productId' element={<Product />} /> {/* Specify productId param */}
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/login' element={<LoginSignup/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
