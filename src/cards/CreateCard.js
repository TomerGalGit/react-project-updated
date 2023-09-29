import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { GeneralContext } from "../App";
import TitleEffect from "../components/TitleEffect";
import './CreateCard.css'

const defaultTheme = createTheme();

export default function CreateCard({ text }) {
  const { Snackbar, setLoader } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const structure = [
    {
      name: "subtitle",
      type: "text",
      label: "Go-By Quote",
      required: true,
      halfWidth: true,
    },
    {
      name: "description",
      type: "text",
      label: "Job",
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
      name: "web",
      type: "text",
      label: "Web",
      required: false,
      halfWidth: true,
    },
    {
      name: "imgUrl",
      type: "text",
      label: "Image url",
      required: false,
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
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    imgUrl: "",
    imgAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const handleInput = (ev) => {
    const { id, value } = ev.target;
    let obj = {
      ...formData,
      [id]: value,
    };

    setFormData(obj);
  };

  function createCard(ev) {
    ev.preventDefault();

    setLoader(true);

    fetch("https://api.shipap.co.il/clients/login", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((loginData) => {
        const clientId = loginData.id;
        const cardDataWithClientId = {
          ...formData,
          clientId: clientId,
        };

        fetch(
          "https://api.shipap.co.il/business/cards?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0",
          {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(cardDataWithClientId),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setFormData(data);
            Snackbar("Card created successfully");
            navigate("/my-cards");
          })
          .catch((err) => Snackbar(err.message))
          .finally(() => setLoader(false));
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  }

  return (
    <div className="background-doodles">
    <ThemeProvider theme={defaultTheme}>
      <TitleEffect text={"Add New Card"} />
      <div className="titleS">Here you can add new cards to the feed</div>
      <div className="wrapper">
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
            <AddBusinessIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="TitleEffect">
            {text}
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={1.9}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={formData.name}
                  onChange={handleInput}
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Full Name"
                  autoFocus
                  sx={{ backgroundColor: 'white', borderRadius: '5px'}}
                />
                {errors.title ? (
                  <div className="fieldError" style={{ color: "red" }}>
                    {errors.title}
                  </div>
                ) : (
                  ""
                )}
              </Grid>

              {structure.map((item) => (
                <Grid item xs={12} sm={item.halfWidth ? 6 : 12} key={item.name}>
                  <TextField
                    onChange={handleInput}
                    value={formData.name}
                    name={item.name}
                    type={item.type}
                    required={item.required}
                    fullWidth
                    id={item.name}
                    label={item.label}
                    sx={{ backgroundColor: 'white',borderRadius: '5px'}}
                  />
                  {errors[item.name] ? (
                    <div className="fieldError" style={{ color: "red" }}>
                      {errors[item.name]}
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
              ))}
            </Grid>
            <Button
              onClick={createCard}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "black",
                transition: "0.4s",
                fontWeight: "700",
                marginBottom: "200px",
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  border: " 1px solid black",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
    </ThemeProvider>
    </div>
  );
}
