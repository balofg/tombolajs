import React from "react";

import Table from "./components/Table";
import Settings from "./components/Settings";
import "./Tombola.scss";
import { SettingsProvider } from "./context/Settings";

const Tombola = () => {
  return (
    <SettingsProvider>
      <h1 className="title">La Tombola di Natale di Martin</h1>
      <Table />
      <Settings />
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
    </SettingsProvider>
  );
};

export default Tombola;
