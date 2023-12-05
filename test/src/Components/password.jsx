import React, {useState} from "react";

const Password = () => {
    const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="password">
      <div className="text-wrapper">Password</div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default Password