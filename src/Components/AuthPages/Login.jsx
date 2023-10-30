import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderVariant from "../Header/HeaderVariant";
import { Card } from "@mui/material";
import loginbg from "../../Assests/loginbg.jpg";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import bcrypt from "bcryptjs";

const defaultTheme = createTheme();


export default function Login() {
  // const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const enteredEmail = formData.email;
  //   const enteredPassword = formData.password;

  //   // Retrieve user details array from local storage
  //   const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  //   // Check if entered credentials match any user details
  //   const matchedUserDetails = userDetails.find(
  //     (user) =>
  //       user.email === enteredEmail && user.password === enteredPassword
  //   );

  //   if (matchedUserDetails) {
  //     toast.success("Login successful!");

  //     // Store user details in local storage for authentication
  //     localStorage.setItem("authenticatedUserDetails", JSON.stringify(matchedUserDetails));

  //     navigate("/landingPage");
  //   } else {
  //     toast.error("Invalid Credentials");
  //   }
  // };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = {
        email: formData.email,
        password: formData.password,
      };

      const requestBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch("http://localhost:8105/login", requestBody);
      const responsedata = await response.json();

      if (responsedata.statusCodeValue === 401) {
        toast.error("Invalid e-mail or password!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "colored",
        });
      } else if (responsedata.statusCodeValue === 200) {
        const existingUser = responsedata.body;
        if (
          existingUser &&
          (await bcrypt.compare(formData.password, existingUser.password))
        ) {
          localStorage.setItem("token", existingUser.token);
          navigate("/supporteddiet", { state: { existingUser } });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const navigate = useNavigate();
  const handle = () => {
    toast("Login successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <HeaderVariant />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100vh",
          padding: "100px 16px",
          backgroundImage: `url(${loginbg})`,
          backgroundSize: "cover",
        }}
      >
        <Card
          style={{
            width: "100%",
            height: "470px",
            marginLeft: "200px",
            maxWidth: "400px",
            padding: "24px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
            borderRadius: "15px",
            backgroundColor: "rgba(255,255,255,0.8)",
          }}
        >
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "#F68712", color: "white" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, mb: 2, backgroundColor: "#80CC28" }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link
                        component={RouterLink}
                        to="/signup"
                        style={{ color: "#F68712" }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Card>
      </Box>
    </>
  );
}
