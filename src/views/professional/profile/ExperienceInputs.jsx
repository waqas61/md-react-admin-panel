import { ErrorMessage, useField } from "formik";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import InputMask from 'react-input-mask';
import "../../../App.css";
import {
  Box,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  TextField,
} from "@mui/material";





const ExperienceInputs = ({ label, ...props }, ref) => {
  const [field] = useField(props);
  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    props.onChange(formattedDate);
  };
  return (
    <>
      {props.type == 'text' ? (
        <>
          <TextField
            required
            size="small"
            variant="outlined"
            fullWidth
            {...field}
            {...props}
          />
          <ErrorMessage component="div" name={field.name} style={errorMessage} />
        </>
      ) : props.type == 'textarea' ? (
        <>
          <TextareaAutosize
            {...field}
            {...props}
            value={props.value}
            style={{
              width: "100%",
              border: "1px solid #BFBFBF",
              borderRadius: "4px",
              marginTop: "20px",
              padding: "10px 14px",
              fontSize: "14px",
              fontWeight: "400",
              fontFamily: "Roboto",
              resize: "none",
              height: "",
            }}
            rows="6"
            placeholder="Enter Performed Functions "
          ></TextareaAutosize>

          {errorMessage && (
            <FormHelperText style={{ color: "#FA5A16" }}>
              <ErrorMessage component="div" name={field.name} style={errorMessage} />
            </FormHelperText>
          )}


        </>
      ) : props.type == 'date' ? (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid display={"flex"} flexDirection={"column"} alignItems={"center"}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  "& .MuiFormControl-root": {
                    width: "100%",
                    overflow: "hidden",
                  },
                }}
              >
                <DatePicker
                  label={props.label}
                  slotProps={{ textField: { size: "small" } }}
                  value={props.value && dayjs(props.value)}
                  // className="border rounded"
                  inputProps={{
                    required: true,
                  }}
                  onChange={(newValue) => {
                    handleDateChange(newValue);
                  }}
                />




              </DemoContainer>


              {/* <ErrorMessage component="div" name={field.name} style={errorMessage} /> */}
            </Grid>
            {errorMessage && (
              <FormHelperText style={{ color: "#FA5A16" }}>
                <ErrorMessage component="div" name={field.name} style={errorMessage} />
              </FormHelperText>
            )}
          </LocalizationProvider>
        </>
      ) : props.type == 'phone' ? (
        <>

          <InputMask
            {...field}
            {...props}
            mask='(999) 999 - 9999'
            maskChar='_'
            value={props.value}
          >
            {(inputProps) => (
              <TextField
                size='small'
                className='w-15 h-30'
                label='Contact Phone'
                variant='outlined'
                // sx={{ mb: 3 }}
                inputProps={{ ...inputProps, type: 'tel' }}
              />
            )}

          </InputMask>


          {errorMessage && (
            <FormHelperText style={{ color: "#FA5A16" }}>
              <ErrorMessage component="div" name={field.name} style={errorMessage} />
            </FormHelperText>
          )}


        </>
      ) : props.type == 'email' ? (
        <>
          <TextField
            required
            type="email"
            size="small"
            variant="outlined"
            fullWidth
            {...field}
            {...props}
          />
          <ErrorMessage component="div" name={field.name} style={errorMessage} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};


export default ExperienceInputs;

const errorMessage = {
  color: "red",
  position: "absolute",
  fontSize: "11px"
};
