import React, { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { GeneralContext } from "../App";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import "./Cards.css";
import "../components/TitleEffect.css";
import TitleEffect from "../components/TitleEffect";
import TitleEffectSmall from "../components/TitleEffectSmall";

export default function FavoriteCards() {
  const [favoriteCards, setFavoriteCards] = useState([]);
  const { setLoader, Snackbar } = useContext(GeneralContext);

  const toggleFavorite = async (card) => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://api.shipap.co.il/cards/${card.id}/${
          card.favorite ? "unfavorite" : "favorite"
        }?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`,
        {
          credentials: "include",
          method: "PUT",
        }
      );

      if (response.ok) {
        const updatedCard = { ...card, favorite: !card.favorite };
        const updatedFavoriteCards = favoriteCards.map((c) =>
          c.id === updatedCard.id ? updatedCard : c
        );
        setFavoriteCards(updatedFavoriteCards);
        Snackbar(
          updatedCard.favorite
            ? "Card added to favorites"
            : "Card removed from favorites"
        );
      } else {
        console.error("Failed to toggle favorite.");
        Snackbar("Failed to toggle favorite.");
      }
    } catch (error) {
      console.error(error);
      Snackbar("Failed to toggle favorite.");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.shipap.co.il/cards/favorite?token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFavoriteCards(data);
      })
      .catch((error) => {
        console.error(error);
        Snackbar("Error loading favorite cards");
      })
      .finally(() => setLoader(false));
  }, []);


  const groupCardsIntoRows = (cards) => {
    const rows = [];
    for (let i = 0; i < cards.length; i += 3) {
      const rowCards = cards.slice(i, i + 3);
      rows.push(
        <div className="cardRow" key={i}>
          {rowCards.map((card) => (
            <div>
            <div key={card?.id} className="card">
              {card && (
                <>
                
                  <div className="avatar-background">
                    <div className="card-avatar">
                      {card.imgUrl && (
                        <img src={card.imgUrl} alt={card.imgAlt} />
                      )}
                    </div>
                  </div>
                  <div className="card-description">
                    <div className="card-title">{card.title}</div>
                    <div className="card-job">{card.description}</div>
                    <div className="card-subtitle">"{card.subtitle}"</div>
                    <div className="card-city">
                      <LocationCityIcon fontSize="small" /> {card.city} ,{" "}
                      {card.street} {card.houseNumber}
                    </div>
                    <div className="card-details">
                      <div className="card-phone">
                        <LocalPhoneIcon fontSize="small" /> {card.phone}
                      </div>
                      <div className="card-email">
                        <AlternateEmailIcon fontSize="small" /> {card.email}
                      </div>
                    </div>
                  </div>
                </>
              )}
              </div>
                    <div className="header-btns">
                      <IconButton
                        className="heart-icon"
                        aria-label="add to favorites"
                        onClick={() => toggleFavorite(card)}
                      >
                        <FavoriteIcon
                          style={{
                            fontSize: "55px",
                            color: card.favorite ? "red" : "grey",
                          }}
                        />
                      </IconButton>
                      <button
                        class="call-button"
                        onClick={() =>
                          (window.location.href = `tel:${card.phone}`)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          viewBox="0 0 32 32"
                          height="32"
                          fill="none"
                          class="svg-icon"
                        >
                          <path
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke="#fff"
                            fill-rule="evenodd"
                            d="m24.8868 19.1288c-1.0274-.1308-2.036-.3815-3.0052-.7467-.7878-.29-1.6724-.1034-2.276.48-.797.8075-2.0493.9936-2.9664.3258-1.4484-1.055-2.7233-2.3295-3.7783-3.7776-.6681-.9168-.4819-2.1691.3255-2.9659.5728-.6019.7584-1.4748.4802-2.2577-.3987-.98875-.6792-2.02109-.8358-3.07557-.2043-1.03534-1.1138-1.7807-2.1694-1.77778h-3.18289c-.60654-.00074-1.18614.25037-1.60035.69334-.40152.44503-.59539 1.03943-.53345 1.63555.344 3.31056 1.47164 6.49166 3.28961 9.27986 1.64878 2.5904 3.84608 4.7872 6.43688 6.4356 2.7927 1.797 5.9636 2.9227 9.2644 3.289h.1778c.5409.0036 1.0626-.2 1.4581-.569.444-.406.6957-.9806.6935-1.5822v-3.1821c.0429-1.0763-.7171-2.0185-1.7782-2.2046z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>

                
                    </div>
                    </div>
          ))}
        </div>
      );
    }
    return rows;
  };
  return (
    <>
      <header>
        <div className="FavoriteCards">
            <div className="titleBackgroundFavCards">
              <TitleEffect text={"My Favorites"} />
              <TitleEffectSmall
                text={"Here you can find your favorite cards"}
              />
            </div>
        </div>
      </header>
      {groupCardsIntoRows(favoriteCards)}
    </>
  );
}
