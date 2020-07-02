import React, { useState, useImperativeHandle } from 'react';
import { Button } from '../style';

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
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={visible ? null : hiddenStyle}>
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </React.Fragment>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;