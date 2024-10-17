import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const PopoverCustom = ({ date, type, id }) => (
  
  <OverlayTrigger
    trigger={['click', 'focus']}
    placement='left'
    overlay={
      <Popover id='popover-basic' style={{ minWidth: '20rem' }}>
        <h5
          style={{
            padding: '1rem',
            paddingBottom: 0,
            fontWeight: '600',
            color: '#FA5A16',
            marginBottom: '0rem',
          }}
        >
          Attention
        </h5>
        <Popover.Body>
          <p style={{ marginBottom: '1rem' }}>
            The start date for this permanent job is about to expire. Please
            update this posting to a new start date.
          </p>
          <a
            style={{ padding: '1rem', paddingLeft: 0 }}
            href={`/owner/postings/edit/${type}/${id}`}
          >
            Edit this posting
          </a>
        </Popover.Body>
      </Popover>
    }
  >
    <div className='d-flex align-items-center text-danger'>
      <button
        className='text-danger'
        style={{
          backgroundColor: 'inherit',
          padding: 0,
          paddingRight: '1rem',
          margin: 0,
          border: '0px solid #ccc',
          gap: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span>{date}</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='17'
          viewBox='0 0 16 17'
          fill='none'
        >
          <g id='assistant_photo_24px'>
            <path
              id='icon/image/assistant_photo_24px'
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M3 2.83398H9L9.26667 4.16732H13V10.834H8.33333L8.06667 9.50065H4.33333V14.1673H3V2.83398ZM7.96 4.42732L7.90667 4.16732H4.33333V8.16732H9.16L9.37333 9.24065L9.42667 9.50065H11.6667V5.50065H8.17333L7.96 4.42732Z'
              fill='#FA5A16'
            />
          </g>
        </svg>
      </button>
    </div>
  </OverlayTrigger>
);

export default PopoverCustom;
