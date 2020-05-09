import React from "react";

import "./Checkbox.css";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChanged: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChanged,
}) => {
  return (
    <input
      className="round-checkbox"
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(event) => onCheckedChanged(event.target.checked)}
    />
  );
};

export default Checkbox;
