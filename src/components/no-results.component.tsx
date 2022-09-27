import * as React from "react";
import Box from "@mui/material/Box";

export const NoResults = () => (
  <Box
    sx={{
      marginTop: "100px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      alignContent: "center",
    }}
  >
    <span className="no-results">No results...</span>
  </Box>
);
