"use client";
import * as React from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { toast } from 'react-toastify';
import{useRouter} from "next/navigation"

interface FormData {
  username: string;
  password: string;
}

export default function Login() {

    const router=useRouter()
  // State to handle form data
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.username && formData.password) {
      try {
        const response = await fetch("http://localhost:8000/login/", { // Replace with your API URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          const data = await response.json();
          // Store token or user information securely
          console.log(data)
          localStorage.setItem('token', data.tokens.refresh); // Update based on your API response
          console.log("Login successful!");
          router.push("/Profile")
          // Redirect or update UI as needed, e.g., window.location.href = '/dashboard';
        } else {
          const errorData = await response.json();
          toast.error(`Login failed: ${errorData.detail || 'Unknown error'}`);
        }
      } catch (error) {
        toast.error("An error occurred!");
      }
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} // Form submission handler
      sx={{
        background: "white",
        width: "500px",
        padding: "30px",
        margin: "40px auto",
        boxShadow: "10px 10px 10px rgba(0,0,0,0.2), -10px -10px 10px rgba(0,0,0,0.2)",
        borderRadius: "20px",
        textAlign: "center"
      }}
    >
      <Typography component={"h2"} sx={{ textAlign: "center", color: "black", fontSize: "2rem" }}>
        Login
      </Typography>

      <TextField
        fullWidth
        id="username"
        name="username" // Add name attribute to link with state
        label="Enter your username"
        variant="outlined"
        value={formData.username} // Bind value to state
        onChange={handleChange} // Handle input change
        sx={{ display: "block", width: "100%", margin: "10px 0" }}
      />

      <TextField
        fullWidth
        id="password"
        name="password" // Add name attribute to link with state
        label="Enter your password"
        variant="outlined"
        type="password"
        value={formData.password} // Bind value to state
        onChange={handleChange} // Handle input change
        sx={{ display: "block", width: "100%", margin: "10px 0" }}
      />

      <Link href="/Forgotpassword" className='text-blue-500' style={{ marginBottom: "20px", display: "block" }}>
        Forgot password?
      </Link>

      <Button
        type="submit" // Add type="submit" for form submission
        variant="contained"
        sx={{ display: "block", margin: "20px auto", padding: "8px 59px" }}
      >
        Submit
      </Button>

      <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
        Or login with
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            width: "30%",
            backgroundColor: "#fff",
            borderColor: "#4285F4",
            color: "#4285F4",
            '&:hover': {
              backgroundColor: "#4285F4",
              color: "#fff",
            }
          }}
        >
          Google
        </Button>

        <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          sx={{
            width: "30%",
            backgroundColor: "#fff",
            borderColor: "#1877F2",
            color: "#1877F2",
            '&:hover': {
              backgroundColor: "#1877F2",
              color: "#fff",
            }
          }}
        >
          Facebook
        </Button>

        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          sx={{
            width: "30%",
            backgroundColor: "#fff",
            borderColor: "#000",
            color: "#000",
            '&:hover': {
              backgroundColor: "#000",
              color: "#fff",
            }
          }}
        >
          GitHub
        </Button>
      </Box>

      <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
        If you don't have an account, then <Link href="/Signup" className='text-blue-500'>Signup</Link>
      </Typography>
    </Box>
  );
}
