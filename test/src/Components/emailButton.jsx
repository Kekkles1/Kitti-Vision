import React, {useState} from "react";
import "./EmailButton.css";

export const EmailButton = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="email-button">
      <div className="text-wrapper">Email</div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

