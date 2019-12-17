/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";

import smorfia from "../model/smorfia.json";

const Popup = ({ number, onClose }) => {
  const [action, setAction] = useState("open");

  const handleAnimationEnd = () => {
    if (action === "close") {
      onClose();
    }

    setAction(null);
  };

  let animationClass;

  switch (action) {
    case "open":
      animationClass = "popup--open";
      break;
    case "close":
      animationClass = "popup--close";
      break;
    default:
      animationClass = null;
      break;
  }

  const { na, it, emojis } = smorfia[number];

  return (
    <div
      className={`popup ${animationClass || ""}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="popup-content">
        <a className="popup-close" onClick={() => setAction("close")}>
          &times;
        </a>

        {emojis.length ? (
          <div className="smorfia-images">
            {emojis.map(emoji => (
              <img key={emoji} src={`images/emoji/${emoji}`} alt={it} />
            ))}
          </div>
        ) : null}
        {na ? <h2 className="smorfia-na">{na}</h2> : null}
        {it ? <p className="smorfia-it">{it}</p> : null}
      </div>
    </div>
  );
};

export default Popup;
