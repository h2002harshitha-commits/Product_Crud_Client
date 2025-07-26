import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Link,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() { 
     
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    picture:null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
//     
setForm ({...form,[e.target.name]: e.target.value});
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validate()) return;
    
    console.log(form);
    const userData = new FormData();
    userData.append("name",form?.name);
    userData.append("phone",form?.phone);
    userData.append("email",form?.email);
    userData.append("password",form?.password);
    userData.append("profile",form?.picture);
    
    axios.post("https://product-crud-server.onrender.com/user/register",userData)
    .then((res) => {
        // console.log(res.data);
        if(res.data.success) {
            toast.success(res.data.message);
            navigate("/login");
        } else {
            toast.error(res.data.message);
        }
        
    })
    .catch((err) => {
        console.log(err);
    });
  };
  const handleReset = () => {
    setForm({ name: '', phone: '', email: '', password: '',profile:'' });
    setErrors({});
  };

   return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 4, backgroundColor: 'lightblue', borderRadius: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Register
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />
         <TextField
          fullWidth
          label="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 2 }}
        />
        {/* <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          sx={{ mb: 3 }}
        /> */}
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
            Register
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </form>
      <Typography textAlign="center" sx={{ mt: 3, fontSize: 14, color: "#444" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2e7d32",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Login here
          </Link>
        </Typography>
    </Box>
  );
    
 };

//   const handleReset = () => {
//     setForm({ name: '', email: '', password: '', confirmPassword: '' });
//     setErrors({});
//   };

 

