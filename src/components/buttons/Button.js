import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Button.css";

const Button = ({
  text,
  onClick,
  icon,
  color,
  backgroundColor,
  iconColor,
}) => {

  return (
    <button
      className="Button"
      onClick={onClick}
      style={{
        color: color || "inherit",
        backgroundColor: backgroundColor || "inherit",
      }}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="ButtonIcon"
          style={{ color: iconColor || "#e2a55e" }}
        />
      )}
      <p className="buttonText">{text}</p>
     
    </button>
  );
};

export default Button;
