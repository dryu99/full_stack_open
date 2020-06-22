import React, { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const hiddenStyle = { display: 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <React.Fragment>
      <div style={visible ? hiddenStyle : null}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={visible ? null : hiddenStyle}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </React.Fragment>
  );
};

export default Togglable;