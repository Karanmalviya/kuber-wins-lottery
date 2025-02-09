import React, { useState } from "react";
import {
  Button,
  Input,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
} from "@material-ui/core";
import { TimePicker } from "material-ui-time-picker";
import moment from "moment";

import "./CustomTimePicker.css";
import { useEffect } from "react";

const CustomTimePicker = (props) => {
  const TIME_FORMAT_24H = "HH:mm";
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [defaultTime, setDefaultTime] = useState("");

  useEffect(() => {
    if (props.defaultValue !== "") {
      setDefaultTime(props.defaultValue);
    }
  }, [props.defaultValue]);

  const openDialog = () => {
    setDialogIsOpen(true);
  };

  const handleDialogTimeChange = (newValue) => {
    const momentValue = moment(newValue);
    setSelectedValue(momentValue.toDate());
  };

  const closeDialog = () => {
    setDialogIsOpen(false);
  };

  const logTimeIn24HourFormat = () => {
    if (selectedValue) {
      const momentValue = moment(selectedValue);
      const timeIn24HourFormat = momentValue.format(TIME_FORMAT_24H);
      props.value(timeIn24HourFormat);
    }
    closeDialog();
  };

  useEffect(() => {
    if (props.disabled) {
      props.value("");
    }
  }, [props.disabled]);

  return (
    <span>
      <Input
        disabled={props.disabled}
        // disableUnderline
        // style={{ borderBottom: "1px solid #000" }}
        className={`form-control form-control-sm ${
          props.disabled && `underline_disabled`
        }`}
        readOnly
        InputProps={{
          disableUnderline: true,
        }}
        required
        value={
          selectedValue
            ? props.disabled
              ? ""
              : moment(selectedValue)?.format(TIME_FORMAT_24H)
            : defaultTime
        }
        endAdornment={
          <InputAdornment position="end" disablePointerEvents={props?.disabled}>
            <IconButton onClick={openDialog}>
              <svg
                width="24"
                height="24"
                className="MuiSvgIcon-root"
                focusable="false"
                fill="#0000008a"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
              </svg>
            </IconButton>
          </InputAdornment>
        }
      />
      <Dialog maxWidth="xs" open={dialogIsOpen}>
        <TimePicker
          mode="24h"
          value={selectedValue ? selectedValue : null}
          onChange={handleDialogTimeChange}
        />
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={logTimeIn24HourFormat} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default CustomTimePicker;
