import { Box, Card, CardContent, Grid, TextField, Typography, InputAdornment } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export default function BrowseProducts({ token }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("http://localhost:7000/product/view-others-products", {
            headers: { "auth-token": token },
        })
            .then((res) => {
                if (res.data.success) {
                    setProducts(res.data.products);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const filterProducts = search === ""
        ? products
        : products?.filter((item) =>
            item?.name?.toLowerCase().includes(search?.toLowerCase())
        );

    return (
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4, fontWeight: 600 }}>
                Browse Products
            </Typography>

            {/* Search Bar */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    type="search"
                    label="Search product here"
                    placeholder="Search by product name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                />
            </Box>

            {/* Products Grid */}
            <Grid container spacing={3}>
                {filterProducts?.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" color="text.secondary">
                            No products found!
                        </Typography>
                    </Grid>
                ) : (
                    filterProducts?.map((product, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                            <Card
                                component={Link}
                                to={`/view/${product?._id}`}
                                sx={{
                                    textDecoration: "none",
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    '&:hover': {
                                        transform: "translateY(-5px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <img
                                    src={`http://localhost:7000/uploads/product/${product?.picture}`}
                                    alt={product?.name}
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderTopLeftRadius: "12px",
                                        borderTopRightRadius: "12px",
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 500, color: "#333" }}
                                    >
                                        {product?.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {moment(product?.createdAt).fromNow()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
}
