import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { FaUser } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { AuthContext } from "../../userContext";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const theme = createTheme();

export default function SignInSide() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(false);
      const formData = new FormData(event.currentTarget);
      const data = await axios.post(
        process.env.REACT_APP_API + "/api/user/sign-in",
        {
          email: formData.get("email"),
          password: formData.get("password"),
        }
      );
      if (data.status === 200) {
        localStorage.setItem("jwt", data.data.jwt);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        context.login(data.data.user, data.data.jwt);
        navigate("/");
      }
    } catch (error) {
      setStatus("Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <FaUser />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <div className="login__status">
              {status ? (
                <Typography
                  variant="body1"
                  color="error"
                  bgcolor={"pink"}
                  p={2}
                  borderRadius={4}
                >
                  {status}
                </Typography>
              ) : null}
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? "Sign In" : <ClipLoader color={"#fff"} />}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
