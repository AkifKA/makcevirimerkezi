import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../context/AuthContext";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { signUpProvider, createUser } = useAuthContext();
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check validations
    const validationErrors = validateInputs(name, value);
    setErrors({
      ...errors,
      [name]: validationErrors[name],
    });
  };

  const validateInputs = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "firstName":
        newErrors.firstName = value.trim() === "" ? "İsim gereklidir." : "";
        break;
      case "lastName":
        newErrors.lastName = value.trim() === "" ? "Soy isim gereklidir." : "";
        break;
      case "email":
        newErrors.email = !isValidEmail(value)
          ? "Geçerli bir email girin."
          : "";
        break;
      case "password":
        newErrors.password = validatePassword(value);
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value !== formData.password ? "Şifreler uyuşmuyor." : "";
        break;
      default:
        break;
    }

    return newErrors;
  };

  const isValidEmail = (email) => {
    // Email validation regex with Turkish characters
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+\.)*[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Şifre en az 8 karakter olmalıdır.";
    }
    // Check if password contains at least one special character
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (!specialCharRegex.test(password)) {
      return "Şifre en az bir özel karakter içermelidir.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check validations for all fields
    const newErrors = validateInputs("firstName", formData.firstName);
    newErrors.lastName = validateInputs("lastName", formData.lastName).lastName;
    newErrors.email = validateInputs("email", formData.email).email;
    newErrors.password = validateInputs("password", formData.password).password;
    newErrors.confirmPassword = validateInputs(
      "confirmPassword",
      formData.confirmPassword
    ).confirmPassword;

    // If there are errors, set them and return
    if (
      newErrors.firstName ||
      newErrors.lastName ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      setErrors(newErrors);
      return;
    }

    // Other form submission code
    try {
      const displayName = `${formData.firstName} ${formData.lastName}`;
      await createUser(formData.email, formData.password, displayName);
    } catch (error) {
      console.log("Signup error:", error);
    }
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
            <PersonAddSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kayıt Yap
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="İsim"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Soy İsim"
              name="lastName"
              autoComplete="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresi"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Şifre Tekrar"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              Kayıt Yap
            </Button>
            <Grid container>
              <Grid item xs>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FcGoogle />}
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => signUpProvider()}
                >
                  Google ile kayıt yap
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
