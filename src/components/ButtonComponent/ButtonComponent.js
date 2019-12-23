import React from "react";
import { Button } from "react-bootstrap";

function ButtonComponent({ isActive = false, text, onSelect }) {
  return (
    <Button
      data-testid={"pagi-btn"}
      className="btn mr-1 mr-1 pb-0 pt-0 pr-1 pl-1 shadow-none"
      variant={"outline-dark"}
      onClick={onSelect}
      active={isActive}
    >
      {text}
    </Button>
  );
}

export default ButtonComponent;
