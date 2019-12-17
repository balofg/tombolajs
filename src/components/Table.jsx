/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect, useRef, useContext } from "react";

import { SettingsContext } from "../context/Settings";
import Cell from "./Cell";
import { toggleNumber } from "../state/numbers";
import Popup from "./Popup";

const Table = () => {
  const tableRef = useRef();
  const settings = useContext(SettingsContext);
  const [popupNumber, setPopupNumber] = useState(null);

  const [selectedNumbers, setSelectedNumbers] = useState(settings.backup);

  useEffect(() => {
    settings.init(tableRef.current, reset);
  }, [settings]);

  const cells = Array(90)
    .fill(null)
    .map((item, index) => index + 1);

  const sections = Array(3)
    .fill(null)
    .map((item, index) => index);

  const rows = Array(3)
    .fill(null)
    .map((item, index) => index);

  const handleNumberClick = number => {
    if (settings.isSmorfiaEnabled && selectedNumbers.indexOf(number) === -1) {
      setPopupNumber(number);
    }

    const newSelectedNumbers = toggleNumber(number, selectedNumbers);

    setSelectedNumbers(toggleNumber(number, selectedNumbers));
    settings.saveBackup(newSelectedNumbers);
  };

  const reset = () => {
    setSelectedNumbers([]);
  };

  return (
    <div className="table" ref={tableRef}>
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
      {popupNumber !== null && settings.isSmorfiaEnabled ? (
        <Popup number={popupNumber} onClose={() => setPopupNumber(null)} />
      ) : null}
    </div>
  );
};

export default Table;
