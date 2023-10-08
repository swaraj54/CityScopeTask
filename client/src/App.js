import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Team from './components/Team';
import Journey from './components/Journey';
import Contact from './components/Contact';
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Common/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/single-product/:id' element={<SingleProduct />} />
        <Route exact path='/all-products' element={<AllProducts />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/journey' element={<Journey />} />
        <Route exact path='/team' element={<Team />} />
      </Routes>

    </div>
  );
}

export default App;
