import React, { Fragment, useEffect } from "react";
import { search } from "@app/services";
import "./App.css";
import { SearchField } from "@app/components";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import useAppState, {
  selectAllFilmLocations,
  selectTypeQuery,
  selectPostalCodeQuery,
  selectYearQuery,
} from "@app/state/useAppState";
import List from "@mui/material/List";
import { LocationListItem } from "@app/components/location-list-item.component";
import { ActivityTypeSelector } from "@app/components/activity-type-selector.component";
import { YearSelector } from "@app/components/year-selector.component";
import { NoResults } from "@app/components/no-results.component";

function App() {
  const { state, actions } = useAppState();
  const locations = selectAllFilmLocations(state);

  const postalCodeQuery = selectPostalCodeQuery(state);
  const yearQuery = selectYearQuery(state);
  const activityTypeQuery = selectTypeQuery(state);

  useEffect(() => {
    search({
      options: {
        Année: [yearQuery],
        Arrondissement: [postalCodeQuery],
        Type: [activityTypeQuery],
      },
    }).then((res) => actions.addAll(res));
  }, [postalCodeQuery, yearQuery, activityTypeQuery]);

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar
          sx={{
            background: "#ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "stretch",
          }}
        >
          <SearchField
            label="Postal Code"
            data={postalCodeQuery}
            changeHandler={actions.setPostalCode}
          ></SearchField>

          <ActivityTypeSelector
            data={activityTypeQuery}
            changeHandler={actions.setLocationType}
          ></ActivityTypeSelector>
          <YearSelector
            data={yearQuery}
            changeHandler={actions.setYear}
          ></YearSelector>
        </Toolbar>
      </AppBar>
      {locations?.length ? (
        <List
          sx={{
            marginTop: "80px",
            width: "100%",
            maxWidth: 660,
            bgcolor: "background.paper",
          }}
        >
          {locations.map((location) => (
            <Fragment key={location.id}>
              <LocationListItem data={location}></LocationListItem>
            </Fragment>
          ))}
        </List>
      ) : (
        <NoResults></NoResults>
      )}
    </div>
  );
}

export default App;
