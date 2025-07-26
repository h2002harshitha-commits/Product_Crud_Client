import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  TextField,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Product({ token }) {
  const [allProducts, setAllProducts] = useState([]);
  const [state, setState] = useState(true);
  const navigate = useNavigate();
  const handleUpdate = (productInfo) => {
    navigate(`/update-product/${productInfo._id}`, { state: { product: productInfo } });
  };

  const handleDelete = (productInfo) => {
    console.log(productInfo)
    axios
      .delete("https://product-crud-server.onrender.com/product/delete/" + productInfo?._id ,{
        headers: { "auth-token": token },

      })
      .then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          setState(!state);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);

        }
      }).catch((err) => {
        console.log(err)
      });
  }
  console.log(token)
  useEffect(() => {
    axios.get("https://product-crud-server.onrender.com/product/view-all-products", {
      headers: { "auth-token": token },
    }
    )
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAllProducts(res.data.products);

        }
      })
      .catch((error) => {
        console.log(error)
      });
  }, [state]);
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Product List
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }} colSpan={2}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProducts?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" ><h1>
                  No products available</h1>
                </TableCell>
              </TableRow>
            ) : (
              allProducts?.map((p, index) => (
                <TableRow key={index}>
                  <TableCell >
                    <Avatar variant='square'
                      src={`https://product-crud-server.onrender.com/uploads/product/${p?.picture}`} />
                  </TableCell>
                  <TableCell>{p?.name}</TableCell>
                  <TableCell>₹{p?.price}</TableCell>
                  <TableCell>{p?.category}</TableCell>
                  <TableCell>
                    <TextField value={p?.description}
                      fullWidth
                      disabled
                      multiline
                      rows={2}
                    />

                  </TableCell>
                  <TableCell>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button onClick={() => handleDelete(p)} color="error" variant="contained">Delete</Button>
                      <Button
                        onClick={() => handleUpdate(p)}
                        color="primary"
                        variant="contained"
                        sx={{ mr: 1 }}
                      >
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
