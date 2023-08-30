import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useLocation, useNavigate } from "react-router-dom";
import MyLogo from "../assets/logo.png";

import { Grid, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const pages = [
  { title: "Ana Sayfa", icon: "", url: "/" },
  { title: "Çizgifilmler", icon: "", url: "/cartoons" },
  { title: "Alimler", icon: "", url: "/scientists" },
  { title: "Modern Arapça", icon: "", url: "/modern-arabic" },
  { title: "Müzikler", icon: "", url: "/musics" },
  { title: "Haberler", icon: "", url: "/news" },
  { title: "Şiirler", icon: "", url: "/poetries" },
  { title: "Hakkımızda", icon: "", url: "/about" },
  { title: "Geri Bildirim", icon: "", url: "/feedbacks" },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { currentUser, logout } = useAuth();
  console.log("user", currentUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const location = useLocation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" variant="a">
            <Box
              width={180}
              height={70}
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
            >
              {" "}
              <img
                width={"100%"}
                height={"100%"}
                src={MyLogo}
                alt="My Custom Logo"
                variant={"a"}
              />
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ title, icon, url }) => (
                <MenuItem key={title} onClick={() => navigate(url)}>
                  <Typography
                    textAlign="center"
                    sx={{
                      textDecoration: location.pathname === url && "underline",
                    }}
                  >
                    {title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link
            href="/"
            variant="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <img width={180} height={70} src={MyLogo} alt="My Custom Logo" />
          </Link>

          {currentUser && (
            <Typography
              sx={{
                display: { xs: "flex", md: "none" },
                fontWeight: 700,
                fontSize: ".5rem",
                marginRight: ".3rem",
              }}
            >
              {currentUser?.displayName}
            </Typography>
          )}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ title, url, icon }) => (
              <Button
                variant="outlined"
                key={title}
                onClick={() => navigate(url)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "capitalize",
                  fontSize: ".75rem",
                  textDecoration: location.pathname === url && "underline",
                }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mr: 1,
                    fontSize: ".7rem",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  {currentUser?.displayName}
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Ayarları Aç">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={currentUser?.displayName}
                      src={currentUser?.photoURL || Avatar}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser
                ? [
                    <MenuItem onClick={() => navigate("/my-account")}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          textDecoration:
                            location.pathname === "/my-favorites" &&
                            "underline",
                        }}
                      >
                        Hesap Bilgilerim
                      </Typography>
                    </MenuItem>,
                    <MenuItem onClick={() => navigate("/my-favorites")}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          textDecoration:
                            location.pathname === "/my-favorites" &&
                            "underline",
                        }}
                      >
                        Beğenilerim
                      </Typography>
                    </MenuItem>,
                    <MenuItem key="logout" onClick={() => logout()}>
                      <Typography sx={{ textAlign: "center" }}>
                        Çıkış
                      </Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="register"
                      onClick={() => navigate("/register")}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          textDecoration:
                            location.pathname === "/register" && "underline",
                        }}
                      >
                        Kayıt
                      </Typography>
                    </MenuItem>,
                    <MenuItem key="login" onClick={() => navigate("/login")}>
                      <Typography
                        sx={{
                          textAlign: "center",
                          textDecoration:
                            location.pathname === "/login" && "underline",
                        }}
                      >
                        Giriş
                      </Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
