import React, {useState} from "react";

const Password = ({onChange,value}) => {
  return (
    <div className="password">
      <div className="text-wrapper">Password</div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default Password