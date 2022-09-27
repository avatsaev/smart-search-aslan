import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { createEntityAdapter, EntityState } from "redux-ngrx-entity";
import { FilmLocation } from "@app/models";

/*
EntityState<T> shape looks like the following:

{
  ids: Array<number | string>,
  entities: { [id: number | string]: T},
}

- ids:
  is an array of IDs, used for sorting and ordering the records

- entities:
  is an un-ordered key-value Dictionary, allows fast lookup of records by their IDs,
  instead of iterating/filtering over an array of records
  it also has a lsit of ids which helps with sorting
*/
export interface AppState extends EntityState<FilmLocation> {
  year?: string;
  activityType?: string;
  postalCode?: string;
}

/* NGRX Entity Adapter (this is a stand alone version of the package)
   Helps managing/selecting records and performing CRUD operations in an efficient and immutable manner
   More info: https://ngrx.io/guide/entity/adapter */
const filmLocationsEntityAdapter = createEntityAdapter<FilmLocation>({
  selectId: (s) => s.id, // point to an identifier key
  // sortComparer: (a, b) => a.type_tournage  - b.type_tournage // sort entities by rank by default
});

const useAppState = () => {
  const initState: AppState = filmLocationsEntityAdapter.getInitialState({
    year: "2019",
    postalCode: "75002",
    activityType: "Long métrage",
  });

  const [state, setState] = useState(initState);
  const actions = useMemo(() => getActions(setState), [setState]);

  return { state, actions };
};

const getActions = (setState: Dispatch<SetStateAction<AppState>>) => ({
  addAll: (filmLocations: FilmLocation[]) =>
    setState((state) =>
      filmLocationsEntityAdapter.addAll(filmLocations, state)
    ),

  setLocationType: (q?: string) =>
    setState((state) => ({ ...state, activityType: q })),

  setYear: (q?: string) => setState((state) => ({ ...state, year: q })),

  setPostalCode: (q?: string) =>
    setState((state) => ({ ...state, postalCode: q })),

  hydrateState: (newState: AppState) => setState((_) => newState),
});

// State selectors

export const selectYearQuery = (state: AppState): string =>
  state.year ?? new Date().getFullYear().toString();
export const selectTypeQuery = (state: AppState): string =>
  state.activityType ?? "";
export const selectPostalCodeQuery = (state: AppState): string =>
  state.postalCode ?? "";

export const { selectAll: selectAllFilmLocations } =
  filmLocationsEntityAdapter.getSelectors();

export default useAppState;
