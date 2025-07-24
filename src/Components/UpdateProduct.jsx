import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { toast } from 'react-toastify';

export default function UpdateProduct({token}) {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    picture: null,
  });
  useEffect(() => {
    axios
      .get("http://localhost:7000/product/view-single-product/" + id,{
        headers: {"auth-token": token},
      })
      .then((res) => {
        if (res.data.success) {
          setForm(res.data.product);
        } else {
          toast.error(res.data.message);
        }
      

      })
      .catch((err) => {
        console.log(err);

      });
  }, [id]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch categories from API
  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch((err) => console.error("Failed to fetch categories", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Product name is required";
    if (!form.price.trim()) tempErrors.price = "Price is required";
    if (!form.category.trim()) tempErrors.category = "Category is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // console.log( form);
    const productData = new FormData();
    productData.append("name", form?.name);
    productData.append("price", form?.price);
    productData.append("description", form?.description);
    productData.append("category", form?.category);
    if (form?.picture) {
      productData.append("picture", form?.picture);
    }

    axios
      .put("http://localhost:7000/product/update-product/" + id, productData,{
        headers: {"auth-token":token},
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/products");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // alert('Updated successfully!');
    // setTimeout(() => {
    //   navigate('/products');
    // }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1976d2' }}
        >
          Update Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            fullWidth
            margin="normal"
          />

          <TextField
            fullWidth
            label="Product picture"
            type="file"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setForm({
              ...form, picture: e.target.files[0],
            })
            }
            error={!!errors.picture}
            helperText={errors.picture}
            sx={{ mb: 2 }}

          />

          <FormControl fullWidth error={!!errors.category} margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={form.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value=""><em>Select Category</em></MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.category}</FormHelperText>
          </FormControl>

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.2, fontWeight: 'bold', fontSize: '16px' }}
          >
            Update Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}