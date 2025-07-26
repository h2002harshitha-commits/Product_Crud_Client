// App.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import Home from './Pages/Home';
import InsertProduct from './Pages/InsertProduct';
import Product from './Pages/Product';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import UpdateProduct from './Components/UpdateProduct';
import Login from './Pages/Login';
import Register from './Pages/Register';
import axios from 'axios';
import BrowseProducts from './Pages/BrowseProducts';
import ProductDetails from './Pages/ProductDetails';
import Profile from './Pages/Profile';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('light');

  const token = localStorage.getItem("authToken") || null;

  // Toggle between light and dark modes
  const theme = useMemo(() => createTheme({
    palette: {
      mode: mode,
    },
  }), [mode]);

  const getUserProfile = () => {
    axios.get("https://product-crud-server.onrender.com/user/getProfile", {
      headers: { "auth-token": token },
    })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Router>
          <Navbar token={token} user={user} setUser={setUser} mode={mode} setMode={setMode} />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/insert" element={<InsertProduct token={token} />} />
              <Route path="/products" element={<Product products={products} token={token} />} />
              <Route path="/browse" element={<BrowseProducts token={token} />} />
              <Route path="/view/:id" element={<ProductDetails token={token} />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/profile" element={<Profile user={user} />} /> */}

<Route
  path="/insert"
  element={
    <ProtectedRoute user={user}>
      <InsertProduct token={token} />
    </ProtectedRoute>
  }
/>
<Route
  path="/products"
  element={
    <ProtectedRoute user={user}>
      <Product token={token} />
    </ProtectedRoute>
  }
/>
<Route
  path="/browse"
  element={
    <ProtectedRoute user={user}>
      <BrowseProducts token={token} />
    </ProtectedRoute>
  }
/>
<Route
  path="/view/:id"
  element={
    <ProtectedRoute user={user}>
      <ProductDetails token={token} />
    </ProtectedRoute>
  }
/>
<Route
  path="/update-product/:id"
  element={
    <ProtectedRoute user={user}>
      <UpdateProduct />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute user={user}>
      <Profile user={user} />
    </ProtectedRoute>
  }
/>

              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              
            </Routes>
          </div>
          <Footer />
        </Router>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
