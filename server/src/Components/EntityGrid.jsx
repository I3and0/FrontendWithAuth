import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import "../ViewEntity";
import "../Styles/EntityGridStyles.css";


function EntityGrid() {

    const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get("https://featuremarketplacewebapi20231207151555.azurewebsites.net/api/Entity/getallentities")
      .then((resp) => {
        // Assuming the API response contains an array of entities
        setCards(resp.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []); 

  const handleExplore = (entityName) => {
    // Use window.location.href to navigate in the current tab
    window.location.href = `/ViewEntity/${entityName}`;
  };

  return (
    <div>
      <section>
        <div className="entitycontainer">
          <h1>Popular Entities</h1>
            <div className="entitycards">
              {cards.map((card, i) => (
                  <div key={i} className="entitycard">
                    <h3>{card.entityName}</h3>
                    <p>{card.description}</p>
                    {/* <a href='#' className="btn">more..</a> */}
                    {/* <button className="exbtn"
                    onClick={() => {
                      window.open(`/ViewEntity/${card.entityName}`, "_blank", "noopener,noreferrer");
                    }}
                    >Explore</button> */}
                     <button className="exbtn" onClick={() => handleExplore(card.entityName)}>
                  Explore
                </button>
                  </div>
                ))
              }
            </div>
        </div>
      </section>
    </div>
  )
}

export default EntityGrid;
