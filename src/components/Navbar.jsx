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
import TranslateIcon from "@mui/icons-material/Translate";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import avatar from "../assets/avatar.png";

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

  const { currentUser, logOut } = React.useContext(AuthContext);

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
          <TranslateIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          {/* <Stack
         justifyContent={"center"}
         alignItems={"center"}
         direction={"column"}
       >
         <Typography
           variant="h6"
           component="a"
           href="/"
           sx={{
             display: { xs: "none", md: "flex" },
             fontFamily: "monospace",
             fontWeight: 700,
             color: "inherit",
             textDecoration: "none",
             fontSize: "1.5rem",
           }}
         >
           MAK
         </Typography>
         <Typography
           variant="h6"
           component="a"
           href="/"
           sx={{
             display: { xs: "none", md: "flex" },
             fontFamily: "monospace",
             fontWeight: 700,
             color: "inherit",
             textDecoration: "none",
             fontSize: "1.3rem",
           }}
         >
           Çeviri Merkezi
         </Typography>
       </Stack> */}
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
          <TranslateIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.1rem",

              color: "inherit",
              textDecoration: "none",
            }}
          >
            MAK Çeviri Merkezi
          </Typography>
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
                  textDecoration: location.pathname === url && "underline",
                }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={currentUser && currentUser.displayName}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={currentUser.photoURL || avatar} />
              </IconButton>
            </Tooltip>
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
              <MenuItem onClick={() => navigate("/my-favorites")}>
                <Typography
                  sx={{
                    textAlign: "center",
                    textDecoration:
                      location.pathname === "/my-favorites" && "underline",
                  }}
                >
                  Beğenilerim
                </Typography>
              </MenuItem>
              {currentUser ? (
                <MenuItem onClick={() => logOut()}>
                  <Typography sx={{ textAlign: "center" }}>Çıkış</Typography>
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => navigate("/register")}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        textDecoration:
                          location.pathname === "/register" && "underline",
                      }}
                    >
                      Kayıt
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/login")}>
                    <Typography
                      sx={{
                        textAlign: "center",
                        textDecoration:
                          location.pathname === "/login" && "underline",
                      }}
                    >
                      Giriş
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
