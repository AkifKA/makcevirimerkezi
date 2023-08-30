import * as React from "react";
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
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

export default function Login() {
  const { login, loginWithGoogle, forgetPassword } = useAuth();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const [validEmail, setValidEmail] = React.useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    const isValidEmail = validateEmail(value);
    setValidEmail(isValidEmail);
    handleChange(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      await login(email, password);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return regex.test(email);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Giriş Yap
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Addresi"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleEmailChange}
              error={!validEmail}
              helperText={!validEmail && "Enter a valid email address"}
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            /> */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
            >
              Giriş Yap
            </Button>
            <Grid
              container
              justifyContent={"center"}
              alignContent={"center"}
              gap={1}
            >
              <Grid
                container
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Grid item>
                  <Button
                    variant="text"
                    onClick={() => forgetPassword(formData.email)}
                    sx={{
                      textTransform: "capitalize",

                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Şifremi Unuttum
                  </Button>
                </Grid>

                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Hesabınız yok mu? Kayıt yapın!"}
                  </Link>
                </Grid>
              </Grid>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<FcGoogle />}
                onClick={() => loginWithGoogle()}
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Google İle Giriş Yap
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
