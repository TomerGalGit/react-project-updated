import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { GeneralContext } from "../App";
import { useContext } from "react";
import { RoleTypes } from "../components/Navbar";

export default function Login() {
  const { setUser, setLoader, setRoleType } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoader(true);

    fetch(
      `https://api.shipap.co.il/clients/login?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        setRoleType(RoleTypes.user);

        if (data.business) {
          setRoleType(RoleTypes.business);
        } else if (data.admin) {
          setRoleType(RoleTypes.admin);
        }

        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLoader(false));
  };

  return (
    <div className="background-doodles-log">
      <div className="wrapperLog">
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
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
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
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                sx= {{backgroundColor: 'white',borderRadius: '5px'}}

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
                sx= {{backgroundColor: 'white',borderRadius: '5px'}}                
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "black",
                  transition: "0.4s",
                  fontWeight: "700",
                  
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    border: " 1px solid black",
                  },
                }}
              >
                Log In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/signup">Click here to create an account</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}
