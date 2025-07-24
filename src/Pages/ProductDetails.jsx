import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  Avatar,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { toast } from "react-toastify";

export default function ProductDetails({ token }) {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    // Fetch current product details
     window.scrollTo({ top: 0, behavior: 'smooth' }); 
    axios
      .get(`http://localhost:7000/product/view-product-details/${id}`, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        if (res.data.success) {
          const product = res.data.product;
          setProductInfo(product);

          // Fetch recommended products based on category & userId
          axios
            .get(
              `http://localhost:7000/product/recommended?category=${product.category}&userId=${product.userId._id}&excludeId=${product._id}`,
              {
                headers: { "auth-token": token },
              }
            )
            .then((response) => {
              if (response.data.success) {
                setRecommended(response.data.products);
              } else {
                toast.error("No recommended products found.");
              }
            })
            .catch((err) => {
              console.error("Error fetching recommended products", err);
              toast.error("Failed to fetch recommended products.");
            });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load product details.");
      });
  }, [id, token]);

  if (!productInfo) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Product not found!
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* Product Details */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={3}
        alignItems="flex-start"
        sx={{ backgroundColor: "#fafafa", p: 3, borderRadius: 2 }}
      >
        {/* Left Side: Product Image */}
        <Box flex={1}>
          <img
            src={`http://localhost:7000/uploads/product/${productInfo.picture}`}
            alt="Product"
            style={{
              width: "100%",
              borderRadius: "8px",
              maxHeight: "250px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right Side: Product Info */}
        <Box flex={2} display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5" fontWeight="bold">
            {productInfo.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {productInfo.category}
          </Typography>
          <Typography variant="h6" color="primary">
            ₹{productInfo.price}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {productInfo.description}
          </Typography>

          {/* Avatar + Username + Phone in same line */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              p: 1.5,
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                src={`http://localhost:7000/uploads/product/${productInfo.userId?.profile}`}
              />
              <Typography variant="body1">
                {productInfo.userId?.name}
              </Typography>
            </Box>

            <Box>
              {!showPhone ? (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => setShowPhone(true)}
                >
                  Phone no
                </Button>
              ) : (
                <Typography variant="body2" fontWeight="bold">
                  {productInfo.userId?.phone}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Recommended Products */}
      {recommended.length > 0 && (
        <Box sx={{ flexGrow: 1, p: 2, mt: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            recommended products
          </Typography>
          <Grid container spacing={3}>
            {recommended.map((productInfo) => (
              <Grid item xs={12} sm={6} md={3} key={productInfo._id}>
                <Card
                  component={Link}
                  to={`/view/${productInfo._id}`}
                  sx={{
                    textDecoration: "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:7000/uploads/product/${productInfo.picture}`}
                    alt={productInfo.name}
                    sx={{
                      height: 200,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" gutterBottom noWrap>
                      {productInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{productInfo.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
