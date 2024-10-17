import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const CustomScheduleBoxes = ({ count, type }) => {
  const checkedBackgroundColor = {
    personal: '#FFF7E6',
    working: '#E9FFEA',
    phone: '#D7E8FF',
  };

  const checkedBorderColor = {
    personal: '#FFC069',
    working: '#81C784',
    phone: '#75B0FA',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {[1, 2, 3, 4].map((index) => {
          const isChecked = index <= count;

          const borderColor = isChecked ? checkedBorderColor[type] : '#D9D9D9';
          const backgroundColor = isChecked
            ? checkedBackgroundColor[type]
            : '#FFFFFF';

          return (
            <div
              key={index}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                border: `1px solid ${borderColor}`,
                backgroundColor: backgroundColor,
                marginRight: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isChecked && (
                <CheckIcon
                  style={{
                    color: borderColor,
                    fontSize: '16px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {count !== 0 && (
        <span
          style={{
            fontSize: '14px',
            color: '#757575',
          }}
        >
          {count === 4 ? (
            <span
              style={{
                color: checkedBorderColor[type],
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              <DoneAllIcon
                style={{
                  fontSize: '16px',
                  color: checkedBorderColor[type],
                  marginRight: '5px',
                }}
              />
              Done
            </span>
          ) : (
            <p
              style={{
                fontSize: '12px',
                fontWeight: '400',
                color: '#FA5A16',
              }}
            >
              Select {4 - count} day(s)
            </p>
          )}
        </span>
      )}
    </div>
  );
};

export default CustomScheduleBoxes;
