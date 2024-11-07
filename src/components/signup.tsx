"use client";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, SelectChangeEvent } from '@mui/material';
import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

interface FormData {
  fullName: string;
  username: string;
  email: string;
  dob: string;
  gender: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    email: '',
    dob: '',
    gender: '',
    password: '',
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    
    // Differentiating between text input and select input
    if (e.target instanceof HTMLSelectElement) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform your form submission logic here
    try {
      const response = await fetch("http://localhost:8000/api/register/", { // Replace with your API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful", data);
        // Handle success (e.g., show a message or redirect)
      } else {
        const errorData = await response.json();
        console.error(`Error: ${errorData.detail || 'Unknown error'}`);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network error (e.g., show an error message)
    }

    console.log(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        background: 'white',
        width: '500px',
        padding: '30px',
        margin: '40px auto',
        boxShadow: '10px 10px 10px rgba(0,0,0,0.2), -10px -10px 10px rgba(0,0,0,0.2)',
        borderRadius: '20px',
        textAlign: 'center',
      }}
    >
      <Typography component={'h2'} sx={{ textAlign: 'center', color: 'black', fontSize: '2rem' }}>
        Sign up
      </Typography>

      <TextField
        fullWidth
        name="fullName"
        label="Enter your full name"
        variant="outlined"
        value={formData.fullName}
        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
        sx={{ display: 'block', width: '100%', margin: '10px 0' }}
      />

      <TextField
        fullWidth
        name="username"
        label="Enter your username"
        variant="outlined"
        value={formData.username}
        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
        sx={{ display: 'block', width: '100%', margin: '10px 0' }}
      />

      <TextField
        fullWidth
        name="email"
        label="Enter your Email"
        type="email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
        sx={{ display: 'block', width: '100%', margin: '10px 0' }}
      />

      <TextField
        fullWidth
        name="dob"
        label="Date of birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.dob}
        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
        sx={{ display: 'block', width: '100%', margin: '10px 0' }}
      />

      <FormControl fullWidth sx={{ margin: '10px 0' }}>
        <InputLabel id="gender-select-label">Gender</InputLabel>
        <Select
          labelId="gender-select-label"
          id="gender-select"
          name="gender"
          value={formData.gender}
          label="Gender"
          onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
          sx={{ textAlign: 'left' }}
        >
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
          <MenuItem value="O">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        name="password"
        label="Enter your password"
        type="password"
        variant="outlined"
        value={formData.password}
        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
        sx={{ display: 'block', width: '100%', margin: '10px 0' }}
      />

      <Button type="submit" variant="contained" sx={{ display: 'block', margin: '20px auto', padding: '8px 59px' }}>
        Submit
      </Button>

      <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>Or sign up with</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            width: '30%',
            backgroundColor: '#fff',
            borderColor: '#4285F4',
            color: '#4285F4',
            '&:hover': {
              backgroundColor: '#4285F4',
              color: '#fff',
            },
          }}
        >
          Google
        </Button>

        <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          sx={{
            width: '30%',
            backgroundColor: '#fff',
            borderColor: '#1877F2',
            color: '#1877F2',
            '&:hover': {
              backgroundColor: '#1877F2',
              color: '#fff',
            },
          }}
        >
          Facebook
        </Button>

        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          sx={{
            width: '30%',
            backgroundColor: '#fff',
            borderColor: '#000',
            color: '#000',
            '&:hover': {
              backgroundColor: '#000',
              color: '#fff',
            },
          }}
        >
          GitHub
        </Button>
      </Box>

      <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
        If you already have an account, then <Link href="/" className="text-blue-500">login</Link>
      </Typography>
    </Box>
  );
};

export default Signup;
