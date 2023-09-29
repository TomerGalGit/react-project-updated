import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GeneralContext } from "../App";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";

export default function Signup() {
  const { setLoader } = useContext(GeneralContext);
  const navigate = useNavigate();

  const structure = [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
      block: false,
    },
    {
      name: "middleName",
      type: "text",
      label: "Middle Name",
      required: true,
      block: false,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
      block: false,
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone",
      required: true,
      block: false,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      block: false,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      block: false,
    },
    {
      name: "imgUrl",
      type: "text",
      label: "Link Image",
      required: true,
      block: true,
    },
    {
      name: "imgAlt",
      type: "text",
      label: "Image Description",
      required: true,
      block: false,
    },
    {
      name: "state",
      type: "text",
      label: "County",
      required: true,
      block: false,
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      required: true,
      block: false,
    },
    { name: "city", type: "text", label: "City", required: true, block: false },
    {
      name: "street",
      type: "text",
      label: "Street Name",
      required: true,
      block: false,
    },
    {
      name: "houseNumber",
      type: "number",
      label: "House Number",
      required: true,
      block: false,
    },
    {
      name: "zip",
      type: "number",
      label: "Postal Code",
      required: true,
      block: false,
    },
    {
      name: "business",
      type: "boolean",
      label: "Business Account",
      required: true,
      block: false,
    },
  ];

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const obj = {};
    const elements = ev.target.elements;

    structure.forEach((s) => {
      if (s.type === "boolean") {
        obj[s.name] = elements[s.name].value === "on";
      } else {
        obj[s.name] = elements[s.name].value;
      }
    });

    setLoader(true);

    fetch(
      `https://api.shipap.co.il/clients/signup?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj),
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
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => setLoader(false));
  };

  return (
    <div className="background-doodles">
      <div className="wrapper-sign-up">
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
              Create Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {structure.map((s) => (
                  <Grid key={s.name} item xs={12} sm={s.block ? 12 : 6}>
                    {s.type === "boolean" ? (
                      <FormControlLabel
                        name={s.name}
                        control={<Switch color="primary" />}
                        label={s.label}
                        labelPlacement="start"
                      />
                    ) : (
                      <TextField
                        name={s.name}
                        required={s.required}
                        fullWidth
                        id={s.name}
                        label={s.label}
                        type={s.type}
                        sx={{backgroundColor: 'white', borderRadius: '5px'}}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
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
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/login">Click here to log in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}
