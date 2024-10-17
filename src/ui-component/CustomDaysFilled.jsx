import React from 'react';

const CustomDaysFilled = ({
  schedulesCount,
  selectedCandidateCount,
  status,
  cancelledCount,
}) => {
  let outerBoxStyles = {
    padding: '4px',
    margin: '5px',
    borderRadius: '3px',
    border: '1px solid #ccc',
    position: 'relative',
  };

  let countStyles = {};
  let defaultStyles = {};

  if (selectedCandidateCount === schedulesCount) {
    defaultStyles = {
      backgroundColor: '#E9FFEA',
      padding: '2px 10px',
      borderRadius: '2px',
    };
  } else {
    defaultStyles = {
      backgroundColor: '#F5F5F5',
      border: '1px solid #F5F5F5',
      padding: '2px 10px',
      borderRadius: '2px',
    };
  }

  if (status === 'cancelled') {
    countStyles = {
      backgroundColor: '#FA5A16',
      border: '1px solid #FA5A16',
      padding: '2px 10px',
      borderRadius: '2px',
      color: '#fff',
    };
  } else if (selectedCandidateCount === 0) {
    countStyles = {
      backgroundColor: '#FFF3EE',
      border: '1px solid #FF9669',
      padding: '2px 10px',
      borderRadius: '2px',
      position: 'relative',
    };
  } else if (selectedCandidateCount === schedulesCount) {
    countStyles = {
      backgroundColor: '#E9FFEA',
      padding: '2px 10px',
      borderRadius: '2px',
    };
    outerBoxStyles.border = '1px solid #4CAF50';
  } else if (selectedCandidateCount < schedulesCount) {
    countStyles = {
      backgroundColor: '#FFEFBB',
      border: '1px solid #FFCF33',
      padding: '2px 10px',
      borderRadius: '2px',
      color: '#B83E0A',
      position: 'relative',
    };
  }

  return (
    <div style={{ display: 'flex' }}>
      {status === 'cancelled' ? (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{
            color: '#FA5A16',
            fontSize: 14,
            gap: '5px',
          }}
        >
          <div style={{ ...outerBoxStyles }}>
            <span style={{ ...countStyles }}>{cancelledCount}</span>
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#FA5A16',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                border: '1px solid #FFF',
              }}
            >
              x
            </div>
          </div>
          Cancellation Fee(s)
        </div>
      ) : (
        <div style={{ ...outerBoxStyles }}>
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              border: '1px solid #FFF',
              visibility:
                selectedCandidateCount === schedulesCount
                  ? 'visible'
                  : 'hidden',
            }}
          >
            <svg
              width='10'
              height='8'
              viewBox='0 0 10 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.5 7.5L0.5 4.5L1.91 3.09L3.5 4.67L8.59 0.5L10 1.91L3.5 7.5Z'
                fill='white'
              />
            </svg>
          </div>
          <div>
            <span style={{ ...countStyles, marginRight: '5px' }}>
              {selectedCandidateCount}
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor:
                    selectedCandidateCount === 0 ? '#FF9669' : '#FFCF33',
                  borderRadius: '50%',
                  width: '14px',
                  height: '14px',
                  border: '1px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: 'white',
                  fontWeight: 'bold',
                  visibility:
                    selectedCandidateCount === schedulesCount
                      ? 'hidden'
                      : 'visible',
                }}
              >
                !
              </span>
            </span>
            <span>of</span>
            <span style={{ ...defaultStyles, marginLeft: '5px' }}>
              {schedulesCount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDaysFilled;
