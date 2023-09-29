import React, { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../App";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import TitleEffect from "../components/TitleEffect";
import PersonIcon from "@mui/icons-material/Person";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ConfirmationDialog from "../components/ConfirmationDialog";
import EditIcon from "@mui/icons-material/Edit";
import "./UserManage.css";
import TitleEffectSmall from "../components/TitleEffectSmall";
import { useNavigate } from "react-router-dom";

function UserManage() {
  const { setLoader, Snackbar } = useContext(GeneralContext);
  const [users, setUsers] = useState([]);
  const [cardsPerRow, setCardsPerRow] = useState(3);

  const navigate = useNavigate();

  const handleUserEdit = (userId) => {
    console.log("Editing user with ID:", userId);

    navigate(`/edit-user/${userId}`);
  };

  useEffect(() => {
    setLoader(true);

    fetch(
      `https://api.shipap.co.il/admin/clients?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`,
      {
        credentials: "include",
      }
    )
      .then((res) => {
        setLoader(false);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  }, [setLoader]);

  const removeUser = (user) => {
    if (
      !window.confirm(
        "Are you sure you wish to remove this user from the site?"
      )
    ) {
      return;
    } else {
      setLoader(true);
      fetch(
        `https://api.shipap.co.il/admin/clients/${user}?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then(() => {
          setUsers(users.filter((u) => u.id !== user));
          Snackbar("User Removed");
        })
        .catch((err) => console.log(err))
        .finally(() => setLoader(false));
    }
  };

  const groupUsersIntoRows = (users) => {
    const rows = [];
    for (let i = 0; i < users.length; i += cardsPerRow) {
      const rowUsers = users.slice(i, i + cardsPerRow);
      rows.push(
        <div className={`cardRow row-${cardsPerRow}`} key={i}>
          {rowUsers.map((user) => (
            <div key={user.id} className="admin card">
              {user && (
                <>
                  <div className="admin card-description">
                    <div className="admin card-name">
                      <div style={{ marginTop: "10px" }}>
                        <PersonIcon style={{ fontSize: "48px" }} />
                      </div>
                      <b>
                        {user.firstName} {user.lastName}
                      </b>
                    </div>
                    <div className="admin card-business">
                      {user.business ? "Business Account" : "Personal Account"}
                    </div>
                    <div className="admin card-userId">
                      <div
                        className="icon-id"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FormatListNumberedIcon
                          style={{ marginLeft: "13px", marginTop: "0px" }}
                        />
                        <span>
                          {" "}
                          <b>User ID:</b> {user.id}
                        </span>
                      </div>
                    </div>
                    <div className="admin card-city">
                      <LocationCityIcon fontSize="small" />
                      <b>Location:</b> {user.city} , {user.country}
                    </div>
                  </div>
                  <div className="admin card-details">
                    <div className="admin card-email">
                      <AlternateEmailIcon fontSize="small" />
                      <b>Email:</b> {user.email}
                    </div>
                  </div>
                  <div className="header-btns">
                    <button
                      className="noselect delete-btn admin"
                      onClick={() => removeUser(user.id)}
                    >
                      <span className="text">Delete</span>
                      <span className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                        </svg>
                      </span>
                    </button>
                    <button
                      className="edit-btn"
                      placeholder="Edit"
                      onClick={() => handleUserEdit(user.id)}
                    >
                      <EditIcon />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setCardsPerRow(3);
      } else if (window.innerWidth >= 800) {
        setCardsPerRow(2);
      } else {
        setCardsPerRow(1);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="titleBackgroundUserManager">
        <TitleEffect
          style={{ paddingTop: "150px !important" }}
          text={"User Manager"}
        />
        <TitleEffectSmall text={"For Our Amazing And Hardworking Admins"} />
      </div>
      {groupUsersIntoRows(users)}
    </>
  );
}

export default UserManage;
