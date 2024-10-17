import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormHelperText, Grid } from "@mui/material";

// import "../../App.css";




export default function CustomDatePicker({
  label,
  value,
  onChange,
  error,
  disabled,
  size = 'small'
}) {
  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    onChange(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <DemoContainer
        components={["DatePicker"]}
        sx={{
          "& .MuiFormControl-root": {
            width: "100%",
            overflow: "hidden",
          },
        }}

      >
        {value ? (
          <DatePicker
            label={label}
            disabled={disabled}
            slotProps={{ textField: { size: size } }}
            value={value && dayjs(value)}
            onChange={(newValue) => {
              handleDateChange(newValue);
            }}
            sx={
              error
                ? {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "5rem",

                    "& fieldset": {
                      borderColor: "#FA5A16",
                    },
                    "&:hover fieldset": {
                      borderColor: "#FA5A16",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FA5A16",
                    },
                  },
                }
                : { width: "100%" }
            }
            className={error ? "border rounded" : ""}
            inputProps={{
              required: true,
            }}
          />
        ) : (
          <DatePicker
            label={label}
            disabled={disabled}
            slotProps={{ textField: { size: size } }}
            onChange={(newValue) => {
              handleDateChange(newValue);
            }}
            className={error ? "border rounded" : ""}
            inputProps={{
              required: true,
            }}
            sx={
              error
                ? {
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#FA5A16",
                    },
                    "&:hover fieldset": {
                      borderColor: "#FA5A16",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#FA5A16",
                    },
                  },
                }
                : {}
            }
          />
        )}
      </DemoContainer>

      {error && (
        <FormHelperText style={{ color: "#FA5A16" }}>
          Please choose a date.
        </FormHelperText>
      )}

    </LocalizationProvider>
  );
}
