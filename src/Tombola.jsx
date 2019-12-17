import React from "react";

import Table from "./components/Table";
import "./Tombola.scss";

const Tombola = () => {
  return (
    <div>
      <h1 className="title">La Tombola di Natale di Martin</h1>
      <Table />
      <div className="copyright">
        Made with{" "}
        <img
          className="broken-heart"
          src="./images/broken-heart.png"
          alt="broken heart"
        />{" "}
        by{" "}
        <a
          className="github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/balofg/tombolajs"
        >
          Barney
        </a>
      </div>
    </div>
  );
};

export default Tombola;
