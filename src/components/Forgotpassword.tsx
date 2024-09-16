"use client";
import { Box, Button, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  // State to hold form data
  const [formData, setFormData] = useState<FormData>({
    email: '',
  });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update form state based on input name
    });
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform your form submission logic here
    try {
      const response = await fetch("http://127.0.0.1:8000/reset-password-email/", { // Replace with your API URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Password reset request successful", data);
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
      onSubmit={handleSubmit} // Handle form submission
      sx={{
        background: "white",
        width: "400px",
        padding: "30px",
        margin: "40px auto",
        boxShadow: "10px 10px 10px rgba(0,0,0,0.2), -10px -10px 10px rgba(0,0,0,0.2)",
        borderRadius: "20px",
        textAlign: "center",
      }}
    >
      <Typography component={"h2"} sx={{ textAlign: "center", color: "black", fontSize: "2rem" }}>
        Forgot Password
      </Typography>

      <TextField
        fullWidth
        label="Enter your email address"
        name="email" // Add name attribute to link with formData
        variant="outlined"
        type="email"
        value={formData.email} // Bind value to state
        onChange={handleChange} // Handle change event
        sx={{ display: "block", width: "100%", margin: "20px 0" }}
      />

      <Button type="submit" variant="contained" sx={{ display: "block", margin: "20px auto" }}>
        Submit
      </Button>

      <Typography sx={{ textAlign: "center" }}>
        Remembered your password? <Link href="/" className="text-blue-500">Login</Link>
      </Typography>
    </Box>
  );
};

export default ForgotPassword;
