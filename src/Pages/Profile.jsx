import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  TextField,
  Typography,
  Button,
  Stack,
  Input,
} from '@mui/material';

export default function Profile({ user }) {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    picture: null,
  });

  const [preview, setPreview] = useState(null);

  // Load initial user data if available
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        picture: null,
      });

      // If user already has a profile picture, set it as preview
      if (user.picture) {
        setPreview(`http://localhost:7000/uploads/${user.picture}`);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, picture: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('phone', profile.phone);
    if (profile.picture) {
      formData.append('profile', profile.picture);
    }

    // Log to inspect
    console.log('Submitted FormData:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    alert('Profile updated (check console)');
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: 'auto',
        mt: 5,
        padding: 3,
        boxShadow: 3,
        borderRadius: 3,
        bgcolor: '#fff',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        My Profile
      </Typography>

      <Stack direction="column" alignItems="center" spacing={2}>
        <Avatar
          src={preview}
          sx={{ width: 100, height: 100 }}
        />
        <label htmlFor="upload-photo">
          <Input
            accept="image/*"
            id="upload-photo"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <Button variant="contained" component="span">
            Upload Profile Picture
          </Button>
        </label>
      </Stack>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
