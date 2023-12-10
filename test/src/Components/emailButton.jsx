import React, {useState} from "react";
import "./EmailButton.css";

export const EmailButton = ({onChange,value}) => {

  return (
    <div className="email-button">
      <div className="text-wrapper">Email</div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

