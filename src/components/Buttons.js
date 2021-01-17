import React from "react";

function Button({ type, className, onClick, disabled, iconClass, label }) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      <i className={iconClass}></i>
      <span>{label}</span>
    </button>
  );
}

export default Button;