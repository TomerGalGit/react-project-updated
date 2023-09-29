import React, { useState, useEffect, useContext } from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { GeneralContext } from "../App";
import Searchbar from "./Searchbar";
import "./Navbar.css";
import PeopleIcon from "@mui/icons-material/People";

export const RoleTypes = {
  none: 0,
  user: 1,
  business: 2,
  admin: 3,
};

export const checkPermissions = (permissions, userRoleType) => {
  return permissions.includes(userRoleType);
};

const pages = [
  { route: "/", title: "Meet Us" },
  { route: "/about", title: "About" },
  { route: "/login", title: "Log In", permissions: [RoleTypes.none] },
  { route: "/signup", title: "Sign Up", permissions: [RoleTypes.none] },
  {
    route: "/favorite",
    title: "Favorites",
    permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
  },
  {
    route: "/my-cards",
    title: "My Cards",
    permissions: [RoleTypes.business, RoleTypes.admin],
  },
  {
    route: "/create",
    title: "Add Card",
    permissions: [RoleTypes.business, RoleTypes.admin],
  },
  { route: "/admin", title: "User Manager", permissions: [RoleTypes.admin] },
];

const settings = [
  {
    route: "/account",
    title: "My Profile",
    permissions: [RoleTypes.user, RoleTypes.business, RoleTypes.admin],
  },
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, roleType, setUser, setRoleType, setLoader, userId } =
    useContext(GeneralContext);
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;

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

  const logout = () => {
    setLoader(true);

    fetch(`https://api.shipap.co.il/clients/logout`, {
      credentials: "include",
    }).then(() => {
      setUser();
      setRoleType(RoleTypes.none);
      setLoader(false);
      navigate("/");
    });

    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PeopleIcon
            sx={{
              display: { fontSize: "29px", xs: "none", md: "flex" },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              marginRight: "150px",
            }}
          >
            GetHired
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
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
              {pages
                .filter(
                  (p) =>
                    !p.permissions || checkPermissions(p.permissions, roleType)
                )
                .map((page) => (
                  <Link
                    to={page.route}
                    key={page.route}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem key={page.route} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Bebas Neue",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyStaff
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages
              .filter(
                (p) =>
                  !p.permissions || checkPermissions(p.permissions, roleType)
              )
              .map((page) => (
                <Link
                  to={page.route}
                  key={page.route}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      fontFamily: "Bebas Neue",
                      fontSize: "23px",
                      color: "white",
                      display: "block",
                      backgroundColor: page.route === path ? "black" : "",
                      marginRight: "50px",
                      transition: "0.2s !important",
                      "&:hover": {
                        scale: '1.09'
                      },
                  
                    }}
                  >
                    {page.title}
                  </Button>
                </Link>
              ))}
          </Box>
          <Searchbar />
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="/static/images/avatar/new.jpg" />
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
                {settings.map((setting) => (
                  <Link
                    to={setting.route}
                    key={setting.route}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
