import * as React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
export interface OwnProps {
  data?: string;
  label?: string;
  changeHandler?: (q?: string | undefined) => void;
}

export const SearchField: React.FC<OwnProps> = ({
  data: query,
  label,
  changeHandler,
}) => {
  return (
    <TextField
      sx={{ marginRight: "5px" }}
      label={label}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BusinessIcon />
          </InputAdornment>
        ),
      }}
      value={query ? query : ""}
      onChange={(e) => (changeHandler ? changeHandler(e.target.value) : null)}
      margin="normal"
      variant="outlined"
    />
  );
};
