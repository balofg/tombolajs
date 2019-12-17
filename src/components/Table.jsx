/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { toggleNumber } from "../state/numbers";
import Popup from "./Popup";

const Table = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [popupNumber, setPopupNumber] = useState(null);
  const [isSmorfiaEnabled, setIsSmorfiaEnabled] = useState(true);

  useEffect(() => {
    let preloadedSelectedNumbers;

    try {
      preloadedSelectedNumbers = JSON.parse(
        localStorage.getItem("tombola") || "[]"
      );
    } catch (error) {
      preloadedSelectedNumbers = [];
    } finally {
      setSelectedNumbers(preloadedSelectedNumbers);
    }

    if (preloadedSelectedNumbers) {
    }
  }, []);

  const cells = Array(90)
    .fill(null)
    .map((item, index) => index + 1);

  const sections = Array(3)
    .fill(null)
    .map((item, index) => index);

  const rows = Array(3)
    .fill(null)
    .map((item, index) => index);

  const handleReset = () => {
    localStorage.removeItem("tombola");
    setSelectedNumbers([]);
  };

  const handleNumberClick = number => {
    if (isSmorfiaEnabled && selectedNumbers.indexOf(number) === -1) {
      setPopupNumber(number);
    }

    const newSelectedNumbers = toggleNumber(number, selectedNumbers);

    setSelectedNumbers(toggleNumber(number, selectedNumbers));
    localStorage.setItem("tombola", JSON.stringify(newSelectedNumbers));
  };

  return (
    <div className="table">
      {sections.map(section => (
        <div key={`table-section-${section}`} className="table-section">
          {rows.map(row => (
            <div key={`table-row-${row}`} className="table-row">
              {cells
                .slice(section * 30 + row * 10, section * 30 + row * 10 + 10)
                .map(cell => (
                  <Cell
                    number={cell}
                    key={cell}
                    selected={selectedNumbers.indexOf(cell) > -1}
                    onClick={handleNumberClick}
                  />
                ))}
            </div>
          ))}
        </div>
      ))}
      {popupNumber !== null && isSmorfiaEnabled ? (
        <Popup number={popupNumber} onClose={() => setPopupNumber(null)} />
      ) : null}

      <div className="settings">
        <h3 className="settings-title">Settings</h3>
        <ul className="settings-list">
          <li className="settings-item">
            Smorfia:{" "}
            <a
              className={`settings-action ${
                isSmorfiaEnabled ? "settings-action--active" : ""
              }`}
              onClick={() => setIsSmorfiaEnabled(true)}
            >
              ON
            </a>
            {" / "}
            <a
              className={`settings-action ${
                !isSmorfiaEnabled ? "settings-action--active" : ""
              }`}
              onClick={() => setIsSmorfiaEnabled(false)}
            >
              OFF
            </a>
          </li>
          <li className="settings-item">
            <a
              className="settings-action settings-action--active"
              onClick={handleReset}
            >
              RESET
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Table;
