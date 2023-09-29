import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GeneralContext } from "../App";

export default function CardEdit() {
  const [item, setItem] = useState();
  const { id } = useParams();
  const { setUser, setLoader, Snackbar, setRoleType } = useContext(GeneralContext);
  useEffect(() => {
    if (id === "new") {
      setItem({
        id: "",
        createdTime: "",
        title: "",
        description: "",
        subtitle: "",
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
        zip: ''
      });
    } else {
      setLoader(true);

      fetch(`https://api.shipap.co.il/articles/${id}token=d2960a2f-3431-11ee-b3e9-14dda9d4a5f0`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setItem(data))
        .finally(() => setLoader(false));
    }
  }, [id, setLoader]);
  return <div />;
}
