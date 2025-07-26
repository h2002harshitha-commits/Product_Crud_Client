import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Fade,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  PhotoCamera,
  AttachMoney,
  Category,
  Description,
  ShoppingCart,
  Refresh,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function InsertProduct({ token }) {
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    description: '', 
    picture: null 
  });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, picture: file });
    
    // Create preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Product name is required";
    if (!form.price.trim()) tempErrors.price = "Price is required";
    if (isNaN(form.price) || parseFloat(form.price) <= 0) {
      tempErrors.price = "Please enter a valid price";
    }
    if (!form.category) tempErrors.category = "Please select a category";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    const data = new FormData();
    data.append("name", form?.name);
    data.append("price", form?.price);
    data.append("description", form?.description);
    data.append("category", form?.category);
    data.append("picture", form?.picture);

    try {
      const res = await axios.post(
        "https://product-crud-server.onrender.com/product/insert", 
        data, 
        { headers: { "auth-token": token } }
      );
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', price: '', category: '', description: '', picture: null });
    setErrors({});
    setPreviewImage(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Fade in timeout={800}>
        <Paper 
          elevation={8}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Header Section */}
            <Box 
              sx={{ 
                p: { xs: 3, md: 4 }, 
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <ShoppingCart 
                sx={{ 
                  fontSize: { xs: 40, md: 50 }, 
                  color: 'primary.main', 
                  mb: 2 
                }} 
              />
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '3rem' },
                  mb: 1
                }}
              >
                Add New Product
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', md: '1.1rem' }
                }}
              >
                Fill in the details to create a new product listing
              </Typography>
            </Box>

            {/* Form Section */}
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <form onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  {/* Product Name */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ShoppingCart color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                          }
                        }
                      }}
                    />
                  </Grid>

                  {/* Price */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Price"
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      error={!!errors.price}
                      helperText={errors.price}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoney color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                          }
                        }
                      }}
                    />
                  </Grid>

                  {/* Category */}
                  <Grid item xs={12} md={6}>
                    <FormControl 
                      fullWidth 
                      error={!!errors.category}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                          }
                        }
                      }}
                    >
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        label="Category"
                        startAdornment={
                          <InputAdornment position="start">
                            <Category color="primary" />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">
                          <em>Select Category</em>
                        </MenuItem>
                        {categories.map((cat) => (
                          <MenuItem key={cat.slug} value={cat.name}>
                            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.category}</FormHelperText>
                    </FormControl>
                  </Grid>

                  {/* File Upload */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="picture-upload"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="picture-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          fullWidth
                          startIcon={<PhotoCamera />}
                          sx={{
                            height: 56,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 2,
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                            color: 'text.primary',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              borderColor: 'primary.main',
                            }
                          }}
                        >
                          {form.picture ? form.picture.name : 'Upload Product Image'}
                        </Button>
                      </label>
                    </Box>
                  </Grid>

                  {/* Image Preview */}
                  {previewImage && (
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, color: 'white' }}>
                          Image Preview:
                        </Typography>
                        <Box
                          component="img"
                          src={previewImage}
                          alt="Preview"
                          sx={{
                            maxWidth: '100%',
                            maxHeight: 200,
                            borderRadius: 2,
                            boxShadow: 3,
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                          }}
                        />
                      </Box>
                    </Grid>
                  )}

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description (optional)"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 2 }}>
                            <Description color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                          }
                        }
                      }}
                    />
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        justifyContent: 'center',
                        mt: 2
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                          minWidth: { xs: '100%', sm: 200 },
                          height: 50,
                          borderRadius: 3,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                          boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #45a049, #4CAF50)',
                            boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                            transform: 'translateY(-2px)',
                          },
                          '&:disabled': {
                            background: 'rgba(0, 0, 0, 0.26)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {loading ? 'Submitting...' : 'Create Product'}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outlined"
                        size="large"
                        onClick={handleReset}
                        startIcon={<Refresh />}
                        sx={{
                          minWidth: { xs: '100%', sm: 160 },
                          height: 50,
                          borderRadius: 3,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          color: 'text.primary',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            borderColor: 'primary.main',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Reset Form
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}