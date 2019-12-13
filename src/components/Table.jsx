import React, { useState } from "react";
import Cell from "./Cell";
import { toggleNumber } from "../state/numbers";

const Table = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

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
                    selected={selectedNumbers.indexOf(cell) > -1}
                    onClick={number =>
                      setSelectedNumbers(toggleNumber(number, selectedNumbers))
                    }
                  />
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
