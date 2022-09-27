import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export interface OwnProps {
  data?: string;
  changeHandler?: (q?: string | undefined) => void;
}

export const ActivityTypeSelector: React.FC<OwnProps> = ({
  changeHandler,
  data,
}) => {
  const options = ["Long métrage", "Série TV", "Téléfilm"];

  const handleChange = (event: SelectChangeEvent) => {
    if (changeHandler) {
      changeHandler(event.target.value as string);
    }
  };

  return (
    <Box sx={{ minWidth: 120, marginRight: "5px" }}>
      <FormControl margin="normal" fullWidth>
        <InputLabel id="demo-simple-select-label">Activity type</InputLabel>
        <Select
          fullWidth
          sx={{ width: "340px" }}
          value={data}
          label="Activity type"
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
