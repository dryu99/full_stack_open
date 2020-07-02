import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hiddenStyle = { display: 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

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
});

Togglable.displayName = 'Togglable';

export default Togglable;