import * as React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import { useState } from "react";

export interface OwnProps {
  data?: string;
  changeHandler?: (q?: string | undefined) => void;
}

export const YearSelector: React.FC<OwnProps> = ({
  data: yearQuery,

  changeHandler,
}) => {
  const [open, setOpen] = useState(false);
  const onDateSelect = (e: any) => {
    if (changeHandler) {
      changeHandler(e.$y.toString());
    }
  };

  return (
    <Box sx={{ marginTop: "8px", minWidth: 120 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={yearQuery}
          views={["year"]}
          onChange={onDateSelect}
          label="Year"
          inputFormat="YYYY"
          renderInput={(params) => (
            <TextField onClick={(e) => setOpen(true)} {...params} />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};
