import React from "react";
import clsx from "clsx";

const PeriodSelector = ({ selectedPeriod, onSelect }) => {
  const periods = ["Weekly", "Monthly"];

  return (
    <div className="inline-flex bg-gray-200 p-1 rounded-lg">
      {periods.map((period) => (
        <button
          key={period}
          className={clsx(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all relative",
            selectedPeriod === period
              ? "bg-blue-600 text-white shadow-md"
              : "bg-transparent text-gray-700 hover:bg-gray-300"
          )}
          onClick={() => onSelect(period)}
        >
          {selectedPeriod === period && (
            <span className="absolute inset-0 bg-blue-500 opacity-20 rounded-lg"></span>
          )}
          <span className="relative">{period}</span>
        </button>
      ))}
    </div>
  );
};

export default PeriodSelector;
