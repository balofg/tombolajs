import React from "react";

const Cell = ({ number, selected, onClick }) => (
  <div
    className={`cell ${selected ? "cell--selected" : ""}`}
    onClick={() => onClick(number)}
  >
    {number}
  </div>
);

export default Cell;
