import React, { useState } from "react";
import Cell from "./Cell";
import { toggleNumber } from "../state/numbers";
import Popup from "./Popup";

const Table = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [popupNumber, setPopupNumber] = useState(null);

  const cells = Array(90)
    .fill(null)
    .map((item, index) => index + 1);

  const sections = Array(3)
    .fill(null)
    .map((item, index) => index);

  const rows = Array(3)
    .fill(null)
    .map((item, index) => index);

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
                    onClick={number => {
                      if (selectedNumbers.indexOf(number) === -1) {
                        setPopupNumber(number);
                      }

                      setSelectedNumbers(toggleNumber(number, selectedNumbers));
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      ))}
      {popupNumber !== null ? (
        <Popup number={popupNumber} onClose={() => setPopupNumber(null)} />
      ) : null}
    </div>
  );
};

export default Table;
