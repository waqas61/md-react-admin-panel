import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

import CustomTime from '../../../../ui-component/CustomTime';
import DeleteIcon from '../../../../assets/images/Delete.svg';

import { convertTo12Hour, convertTo24Hour } from '../../../../utils/helper';

const style = {
  phone: {
    title: 'Phone 1hr',
    color: '#75B0FA',
  },
  personal: { title: 'Personal 1hr', color: '#FAAD14' },
  working: { title: 'Working 1hr', color: '#81C784' },
};

const ScheduleCard = ({
  applicant,
  interviewStatus,
  posting,
  interviewType,
  setInterviewType,
  interviewSchedule,
  setInterviewSchedule,
  disabled,
  deleteNewEvent,
  events,
  setInterviewScheduleError,
}) => {


  setInterviewScheduleError &&
    setInterviewScheduleError(
      convertTo12Hour(interviewSchedule.start_time).hours >
      convertTo12Hour(interviewSchedule.end_time).hours ||
      (convertTo12Hour(interviewSchedule.start_time).hours ===
        convertTo12Hour(interviewSchedule.end_time).hours &&
        convertTo12Hour(interviewSchedule.start_time).minutes >=
        convertTo12Hour(interviewSchedule.end_time).minutes) ||
      events?.filter((event) => {
        return (
          event.start_time === interviewSchedule.start_time ||
          event.end_time === interviewSchedule.end_time ||
          (event.start_time < interviewSchedule.start_time &&
            event.end_time > interviewSchedule.end_time) ||
          (event.start_time > interviewSchedule.start_time &&
            event.start_time < interviewSchedule.end_time) ||
          (event.end_time > interviewSchedule.start_time &&
            event.end_time < interviewSchedule.end_time)
        );
      }).length > 0
    );



  return (
    <div
      style={{
        borderRadius: '4px',
        backgroundColor: '#ffffff',
        border: '1px solid #accdf6',
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        minWidth: '430px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            gap: '9px',
            alignItems: 'center',
          }}
        >
          <img
            src={applicant?.avatar ? `https://api.mddentalstaffing.com/api/v1/assets/${applicant?.avatar}` : 'https://via.placeholder.com/150'}
            alt=''
            style={{
              height: '25px',
              width: '25px',
              borderRadius: '50%',
              borderBottom: 0,
            }}
          />
          <p
            style={{
              fontSize: '14px',
              fontWeight: 500,
              margin: 0,
              color: '#262626',
            }}
          >
            {applicant?.first_name} {applicant?.last_name}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {!disabled ? (
          <FormControl
            style={{
              width: '120px',
              backgroundColor:
                interviewType === 'personal'
                  ? '#FAAD14'
                  : interviewType === 'working'
                    ? '#81C784'
                    : '#75B0FA',
              borderRadius: '3px',
              border: 0,
              outline: 0,
            }}
            disabled={disabled}
          >
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              style={{
                border: 0,
                outline: 0,
                padding: '0 8px',
                fontSize: 12,
                color: '#262626',
                fontWeight: 500,
              }}
            >
              <MenuItem
                value='personal'
                style={{
                  fontSize: 12,
                  color: '#262626',
                  fontWeight: 500,
                }}
              >
                Personal (1hr)
              </MenuItem>
              <MenuItem
                value='working'
                style={{
                  fontSize: 12,
                  color: '#262626',
                  fontWeight: 500,
                }}
              >
                Working
              </MenuItem>
              <MenuItem
                value='phone'
                style={{
                  fontSize: 12,
                  color: '#262626',
                  fontWeight: 500,
                }}
              >
                Phone (1hr)
              </MenuItem>
            </Select>
          </FormControl>
        ) : // </FormControl>
          interviewStatus === 'scheduled' ? (
            <>
              <FormControl
                style={{
                  width: '120px',
                  backgroundColor:
                    interviewType === 'personal'
                      ? '#FAAD14'
                      : interviewType === 'working'
                        ? '#81C784'
                        : '#75B0FA',
                  borderRadius: '3px',
                  border: 0,
                  outline: 0,
                }}
                disabled={disabled}
              >
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  disabled={true}
                  style={{
                    border: 0,
                    outline: 0,
                    padding: '0 8px',
                    fontSize: 12,
                    color: '#262626',
                    fontWeight: 500,
                  }}
                >
                  <MenuItem
                    value='personal'
                    style={{
                      fontSize: 12,
                      color: '#262626',
                      fontWeight: 500,
                    }}
                  >
                    Personal (1hr)
                  </MenuItem>
                  <MenuItem
                    value='working'
                    style={{
                      fontSize: 12,
                      color: '#262626',
                      fontWeight: 500,
                    }}
                  >
                    Working
                  </MenuItem>
                  <MenuItem
                    value='phone'
                    style={{
                      fontSize: 12,
                      color: '#262626',
                      fontWeight: 500,
                    }}
                  >
                    Phone (1hr)
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <p
                style={{
                  fontSize: 12,
                  color: `${style?.[interviewType]?.color}`,
                  fontWeight: 400,
                  margin: 0,
                  border: `1px solid ${style?.[interviewType]?.color}`,
                  borderRadius: '3px',
                  padding: '2px 8px',
                }}
              >
                {style?.[interviewType]?.title}
              </p>
            </>
          )}

        <p
          style={{
            fontSize: 12,
            color: '#262626',
            fontWeight: 400,
            margin: 0,
            border: '1px solid #D9D9D9',
            borderRadius: '3px',
            padding: '2px 8px',
          }}
        >
          {posting.user_location.place_name}
        </p>
      </div>

      <p
        style={{
          fontSize: 12,
          color: '#262626',
          fontWeight: 500,
          margin: 0,
        }}
      >
        Select Time
      </p>

      <div
        style={{
          display: 'flex',
          gap: '7px',
          alignItems: 'center',
        }}
      >
        <CustomTime
          indicatorsVisible={!disabled}
          hours={convertTo12Hour(interviewSchedule.start_time).hours}
          isActive={true}
          disabled={disabled}
          isError={
            (convertTo12Hour(interviewSchedule.start_time).hours >
              convertTo12Hour(interviewSchedule.end_time).hours &&
              convertTo12Hour(interviewSchedule.start_time).period ===
              convertTo12Hour(interviewSchedule.end_time).period) ||
            (convertTo12Hour(interviewSchedule.start_time).hours ===
              convertTo12Hour(interviewSchedule.end_time).hours &&
              convertTo12Hour(interviewSchedule.start_time).minutes >=
              convertTo12Hour(interviewSchedule.end_time).minutes &&
              convertTo12Hour(interviewSchedule.start_time).period ===
              convertTo12Hour(interviewSchedule.end_time).period) ||
            events?.filter((event) => {
              return (
                event.start_time === interviewSchedule.start_time ||
                event.end_time === interviewSchedule.end_time ||
                (event.start_time < interviewSchedule.start_time &&
                  event.end_time > interviewSchedule.end_time) ||
                (event.start_time > interviewSchedule.start_time &&
                  event.start_time < interviewSchedule.end_time) ||
                (event.end_time > interviewSchedule.start_time &&
                  event.end_time < interviewSchedule.end_time)
              );
            }).length > 0
          }
          displayErrorMessage={false}
          setHours={(newHours) => {

            console.log('Climax === > ', interviewSchedule.start_time);

            const updatedTime = convertTo24Hour(
              newHours,
              convertTo12Hour(interviewSchedule.start_time).minutes,
              convertTo12Hour(interviewSchedule.start_time).period
            );


            console.log('judger === > ', updatedTime);

            setInterviewSchedule((prevState) => {
              return {
                ...prevState,
                start_time: updatedTime,
              };
            });

            if (interviewType !== 'working') {
              const updatedEndTime = convertTo24Hour(
                parseInt(newHours) + 1,
                convertTo12Hour(interviewSchedule.end_time).minutes,
                convertTo12Hour(interviewSchedule.end_time).period
              );
              setInterviewSchedule((prevState) => {
                return {
                  ...prevState,
                  end_time: updatedEndTime,
                };
              });
            }
          }}
          minutes={convertTo12Hour(interviewSchedule.start_time).minutes}
          setMinutes={(newMinutes) => {
            const updatedTime = convertTo24Hour(
              convertTo12Hour(interviewSchedule.start_time).hours,
              newMinutes,
              convertTo12Hour(interviewSchedule.start_time).period
            );
            setInterviewSchedule((prevState) => {
              return {
                ...prevState,
                start_time: updatedTime,
              };
            });

            if (interviewType !== 'working') {
              const updatedEndTime = convertTo24Hour(
                convertTo12Hour(interviewSchedule.end_time).hours,
                newMinutes,
                convertTo12Hour(interviewSchedule.end_time).period
              );
              setInterviewSchedule((prevState) => {
                return {
                  ...prevState,
                  end_time: updatedEndTime,
                };
              });
            }
          }}
          ampm={convertTo12Hour(interviewSchedule.start_time).period}
          setAmpm={(newPeriod) => {
            const updatedTime = convertTo24Hour(
              convertTo12Hour(interviewSchedule.start_time).hours,
              convertTo12Hour(interviewSchedule.start_time).minutes,
              newPeriod
            );
            setInterviewSchedule((prevState) => {
              return {
                ...prevState,
                start_time: updatedTime,
              };
            });
            if (interviewType !== 'working') {
              const updatedEndTime = convertTo24Hour(
                convertTo12Hour(interviewSchedule.end_time).hours,
                convertTo12Hour(interviewSchedule.end_time).minutes,
                newPeriod
              );
              setInterviewSchedule((prevState) => {
                return {
                  ...prevState,
                  end_time: updatedEndTime,
                };
              });
            }
          }}
        />
        <span>-</span>
        <CustomTime
          disabled={disabled}
          isError={
            (convertTo12Hour(interviewSchedule.start_time).hours >
              convertTo12Hour(interviewSchedule.end_time).hours &&
              convertTo12Hour(interviewSchedule.start_time).period ===
              convertTo12Hour(interviewSchedule.end_time).period) ||
            (convertTo12Hour(interviewSchedule.start_time).hours ===
              convertTo12Hour(interviewSchedule.end_time).hours &&
              convertTo12Hour(interviewSchedule.start_time).minutes >=
              convertTo12Hour(interviewSchedule.end_time).minutes &&
              convertTo12Hour(interviewSchedule.start_time).period ===
              convertTo12Hour(interviewSchedule.end_time).period) ||
            events?.filter((event) => {
              return (
                event.start_time === interviewSchedule.start_time ||
                event.end_time === interviewSchedule.end_time ||
                (event.start_time < interviewSchedule.start_time &&
                  event.end_time > interviewSchedule.end_time) ||
                (event.start_time > interviewSchedule.start_time &&
                  event.start_time < interviewSchedule.end_time) ||
                (event.end_time > interviewSchedule.start_time &&
                  event.end_time < interviewSchedule.end_time)
              );
            }).length > 0
          }
          indicatorsVisible={!disabled}
          hours={convertTo12Hour(interviewSchedule.end_time).hours}
          isActive={interviewType === 'working' ? true : false}
          setHours={(newHours) => {
            const updatedTime = convertTo24Hour(
              newHours,
              convertTo12Hour(interviewSchedule.end_time).minutes,
              convertTo12Hour(interviewSchedule.end_time).period
            );
            setInterviewSchedule((prevState) => {
              return {
                ...prevState,
                end_time: updatedTime,
              };
            });
          }}
          minutes={convertTo12Hour(interviewSchedule.end_time).minutes}
          setMinutes={(newMinutes) => {
            const updatedTime = convertTo24Hour(
              convertTo12Hour(interviewSchedule.end_time).hours,
              newMinutes,
              convertTo12Hour(interviewSchedule.end_time).period
            );
            setInterviewSchedule((prevState) => {
              return {
                ...prevState,
                end_time: updatedTime,
              };
            });
          }}
          ampm={convertTo12Hour(interviewSchedule.end_time).period}
          setAmpm={(newPeriod) => {
            const updatedTime = convertTo24Hour(
              convertTo12Hour(interviewSchedule.end_time).hours,
              convertTo12Hour(interviewSchedule.end_time).minutes,
              newPeriod
            );
            setInterviewSchedule((prevState) => {
              return {
                ...prevState,
                end_time: updatedTime,
              };
            });
          }}
        />

        {deleteNewEvent && (
          <div
            style={{
              borderRadius: '50%',
              border: '1px solid #D9D9D9',
              cursor: 'pointer',
              height: '23px',
              width: '23px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => deleteNewEvent()}
          >
            <img
              src={DeleteIcon}
              alt='delete'
              style={{
                height: '16px',
                width: '16px',
              }}
            />
          </div>
        )}
      </div>

      <div>
        <p
          style={{
            fontSize: 12,
            color: '#FA5A16',
            fontWeight: 400,
            margin: 0,
          }}
        >
          {convertTo12Hour(interviewSchedule.start_time).hours >
            convertTo12Hour(interviewSchedule.end_time).hours &&
            convertTo12Hour(interviewSchedule.start_time).period ===
            convertTo12Hour(interviewSchedule.end_time).period
            ? 'Start time should be less than end time'
            : convertTo12Hour(interviewSchedule.start_time).hours ===
              convertTo12Hour(interviewSchedule.end_time).hours &&
              convertTo12Hour(interviewSchedule.start_time).minutes >=
              convertTo12Hour(interviewSchedule.end_time).minutes &&
              convertTo12Hour(interviewSchedule.start_time).period ===
              convertTo12Hour(interviewSchedule.end_time).period
              ? 'Start time should be less than end time'
              : events?.filter((event) => {
                return (
                  event.start_time === interviewSchedule.start_time ||
                  event.end_time === interviewSchedule.end_time ||
                  (event.start_time < interviewSchedule.start_time &&
                    event.end_time > interviewSchedule.end_time) ||
                  (event.start_time > interviewSchedule.start_time &&
                    event.start_time < interviewSchedule.end_time) ||
                  (event.end_time > interviewSchedule.start_time &&
                    event.end_time < interviewSchedule.end_time)
                );
              }).length > 0
                ? 'Time slot is already booked'
                : ''}
        </p>
      </div>
    </div>
  );
};

export default ScheduleCard;
