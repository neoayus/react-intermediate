import { useState } from "react";
import "./TextExpander.css";

export default function TextExpander({
  collapseNumWords = 20,
  linkColor = "blue",

  expandText = "Show More...",
  collapseText = "Show Less.",
  isExpanded = false,
  className = "", 
  children
}) {

  const [expanded, setExpanded] = useState(isExpanded);
  const displayText = expanded ? children : children.split(' ').slice(0, collapseNumWords);

  function handleClick() {
    setExpanded((expanded) => !expanded);
  }

  const buttonStyle = {
    color: linkColor,
    backgroundColor: "white",
    border: "none",
    fontSize: "14px",
  };

  return (
    <p className={className}>
      <span>{displayText}</span>
      <button style={buttonStyle} onClick={handleClick}>
        {expanded ? collapseText : expandText}
      </button>
    </p>
  );
}
