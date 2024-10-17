import React, { useState } from 'react';
import IOSSwitch from 'react-ios-switch';

export default function CustomizedSwitches({ readOnly, onChange, value }) {
  const [checked, setChecked] = useState(value);

  const handleChange = (checked) => {
    onChange(checked);
    setChecked(checked);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IOSSwitch
        checked={checked}
        onChange={handleChange}
        onColor='#4CAF50'
        offColor='#E0E0E0'
        readOnly={readOnly}
      />
    </div>
  );
}
