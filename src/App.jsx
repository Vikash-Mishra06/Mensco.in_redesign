import React from 'react'
import './App.css'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import Index from './Components/Pages/Index'
import ProductDetails from './Components/Pages/ProductDetails'
import Wishlist from './Components/Pages/Wishlist'
import Cart from './Components/Pages/Cart'
import Checkout from './Components/Pages/Checkout'
import Footer from './Components/Footer/Footer'
import About from './Components/Pages/About'
import Shop from './Components/Pages/Products'
import Contact from './Components/Pages/Contact'
import Products from './Components/Pages/Products'
import Sales from './Components/Pages/Sales'

function App() {


  return (
    <>
      <Nav />
      <Routes>
        <Route path='/'element={<Index />} />
        <Route path='/product/:id'element={<ProductDetails />} />
        <Route path='/wishlist'element={<Wishlist />} />
        <Route path='/cart'element={<Cart />} />
        <Route path='/checkout'element={<Checkout />} />
        <Route path='/about'element={<About />} />
        <Route path='/products'element={<Products />} />
        <Route path='/contact'element={<Contact />} />
        <Route path='/sales'element={<Sales />} />



      </Routes>
      <Footer />
    </>
  )
}

export default App
