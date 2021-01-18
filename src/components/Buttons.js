import React from "react";
import { Button } from "shards-react";

function Buttone({ type, className, onClick, disabled, iconClass, label }) {
  return (
    <Button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <i className={iconClass}></i>
      <span>{label}</span>
    </Button>
  );
}

export default Buttone;