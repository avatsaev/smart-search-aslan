import { FilmLocation } from "./film-location.model";

export interface SearchResult {
  filmLocations: FilmLocation[];
  total: number;
  offset: number;
}

export type SearchParams = {
  limit?: number;
  offset?: number;
  options?: { [k: string]: string[] };
};
