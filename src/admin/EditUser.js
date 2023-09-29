import React, { useState, useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../App";

const defaultTheme = createTheme();

function EditUser() {
  const { Snackbar, setLoader } = useContext(GeneralContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.shipap.co.il/admin/clients/${id}?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`,
      {
        credentials: "include",
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
        setFormData(data);
      })
      .catch((err) => {
        Snackbar(err.message);
        navigate(`/account`);
      })
      .finally(() => setLoader(false));
  }, [id]);

  const structure = [
    {
      name: "middleName",
      type: "text",
      label: "Middle name",
      required: false,
      halfWidth: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last name",
      required: true,
      halfWidth: true,
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone",
      required: true,
      halfWidth: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      halfWidth: true,
    },
    {
      name: "imgAlt",
      type: "text",
      label: "Image alt",
      required: false,
      halfWidth: true,
    },
    {
      name: "imgUrl",
      type: "text",
      label: "Image url",
      required: false,
      halfWidth: false,
    },
    {
      name: "state",
      type: "text",
      label: "State",
      required: false,
      halfWidth: true,
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      required: true,
      halfWidth: true,
    },
    {
      name: "city",
      type: "text",
      label: "City",
      required: true,
      halfWidth: true,
    },
    {
      name: "street",
      type: "text",
      label: "Street",
      required: true,
      halfWidth: true,
    },
    {
      name: "houseNumber",
      type: "number",
      label: "House number",
      required: true,
      halfWidth: true,
    },
    {
      name: "zip",
      type: "number",
      label: "Zip",
      required: false,
      halfWidth: true,
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    business: false,
  });

  const handleInput = (ev) => {
    const { id, value } = ev.target;
    let obj = {
      ...formData,
      [id]: value,
    };

    if (id === "business") {
      const { id, checked } = ev.target;
      obj = {
        ...formData,
        [id]: checked,
      };
    }

    setFormData(obj);
  };

  function editInfo() {
    fetch(
      `https://api.shipap.co.il/admin/clients/${id}?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then(() => {
        Snackbar("User updated successfully");
        navigate(`/admin`);
      })
      .catch((err) => Snackbar(err));
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile Information
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={1.9}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formData.firstName}
                  onChange={handleInput}
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              {structure.map((item) => (
                <Grid item xs={12} sm={item.halfWidth ? 6 : 12} key={item.name}>
                  <TextField
                    onChange={handleInput}
                    value={formData[item.name]}
                    name={item.name}
                    type={item.type}
                    required={item.required}
                    fullWidth
                    id={item.name}
                    label={item.label}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <FormControlLabel
                  label="Business"
                  control={
                    <Checkbox
                      id="business"
                      color="primary"
                      checked={formData.business || false}
                      onChange={handleInput}
                      name="business"
                    />
                  }
                />
              </Grid>
            </Grid>
            <Button
              onClick={editInfo}
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 20,
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
              Save Info
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditUser;
