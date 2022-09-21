import { SearchParams, SearchResult } from "@app/models";
import {
  anneeTournageURI,
  normalizeSearchParams,
  otherTextURI,
} from "@app/helpers";

const API_URL =
  "https://opendata.paris.fr/api/v2/catalog/datasets/lieux-de-tournage-a-paris/records";

export const buildQueryParams = (options: SearchParams["options"]) => {
  if (options) {
    const queryParams: Array<string> = [];
    for (let k of Object.keys(options)) {
      if (options[k] && options[k].length) {
        if (k === "Année") {
          queryParams.push(anneeTournageURI(options[k]));
        } else {
          queryParams.push(otherTextURI(options[k], k));
        }
      }
    }
    return queryParams;
  } else {
    return [];
  }
};

export const buildSearchUrl = (params: SearchParams) => {
  const normalizedSearchParams = normalizeSearchParams(params);

  const queryParams = buildQueryParams(normalizedSearchParams?.options);
  const encodedQueryParams = encodeURI("where=" + queryParams.join(" AND "));
  const paramsString = `limit=${normalizedSearchParams.limit}&offset=${normalizedSearchParams.offset}&timezone=UTC`;
  return `${API_URL}?${
    encodedQueryParams ? encodedQueryParams + "&" : ""
  }${paramsString}`;
};

export const search = (params: SearchParams) => {
  const searchURL = buildSearchUrl(params);
  return fetch(searchURL);
};
