import React from "react";

import ButtonComponent from "../ButtonComponent/ButtonComponent";

function PageLimit({ onSelect, limit, limits = [] }) {
  return (
    <div className="text-md-right text-center">
      {limits.map((value, id) => {
        return (
          <ButtonComponent
            key={id}
            text={value}
            onSelect={() => onSelect(value)}
            isActive={limit === value}
          />
        );
      })}
      <span>Per page</span>
    </div>
  );
}

export default PageLimit;
