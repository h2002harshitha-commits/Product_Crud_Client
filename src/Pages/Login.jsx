import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login({ setUser }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" })
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(form);
        axios.post("https://product-crud-server.onrender.com/user/login", form)
            .then((res) => {
                // console.log(res.data);
                if (res.data.success) {
                    toast.success(res.data.message);
                    setUser(res.data.user);
                    localStorage.setItem("authToken", res.data.token);
                    navigate("/");
                } else {
                    toast.error(res.data.message);
                    setUser(null);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    };
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 5,
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        textAlign: "center",
                        fontWeight: 700,
                        color: "#333",
                        letterSpacing: 1,
                    }}
                >
                    Login Page
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        placeholder="you@example.com"
                        variant="outlined"
                        sx={{ mb: 3 }}
                        required
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        variant="outlined"
                        sx={{ mb: 4 }}
                        required
                        onChange={handleChange}
                    />

                    {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 4,
                borderRadius: "30px",
                textTransform: "none",
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                px: 4,
                borderRadius: "30px",
                textTransform: "none",
              }}
            >
              Reset
            </Button>
          </Box> */}


                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            sx={{
                                px: 4,
                                borderRadius: "12px", // Changed shape
                                textTransform: "none",
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="reset"
                            // onClick={handleSubmit}
                            sx={{
                                px: 4,
                                borderRadius: "12px", // Changed shape
                                textTransform: "none",
                            }}
                        >
                            Reset
                        </Button>
                    </Box>

                </form>

                <Typography textAlign="center" sx={{ fontSize: 14, color: "#555" }}>
                    New here?{" "}
                    <Link
                        to="/register"
                        style={{
                            color: "#1976d2",
                            fontWeight: "bold",
                            textDecoration: "none",
                        }}
                    >
                        Create an account
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
