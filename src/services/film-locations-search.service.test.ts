import { buildSearchUrl, search } from "./film-locations-search.service";

test("Search service with all params", () => {
  const searchURL = buildSearchUrl({
    offset: 23,
    limit: 20,
    options: {
      Année: ["2019", "2020"],
      Arrondissement: ["75002"],
      Type: ["Long métrage"],
    },
  });

  const expected =
    "https://opendata.paris.fr/api/v2/catalog/datasets/lieux-de-tournage-a-paris/records?where=(annee_tournage=date'2019/01/01'%20OR%20annee_tournage=date'2020/01/01')%20AND%20ardt_lieu='75002'%20AND%20type_tournage='Long%20m%C3%A9trage'&limit=20&offset=23";

  expect(searchURL).toEqual(expected);
});

test("Search service without params", () => {
  const searchURL = buildSearchUrl({
    options: {
      Année: ["2019", "2020"],
      Arrondissement: ["75002"],
      Type: ["Long métrage"],
    },
  });

  const expected =
    "https://opendata.paris.fr/api/v2/catalog/datasets/lieux-de-tournage-a-paris/records?where=(annee_tournage=date'2019/01/01'%20OR%20annee_tournage=date'2020/01/01')%20AND%20ardt_lieu='75002'%20AND%20type_tournage='Long%20m%C3%A9trage'&limit=20&offset=0";

  expect(searchURL).toEqual(expected);
});

test("search request test", async () => {
  const res = await search({
    offset: 23,
    limit: 20,
    options: {
      Année: ["2019", "2020"],
      Arrondissement: ["75002"],
      Type: ["Long métrage"],
    },
  });

  expect(res).toBeDefined();
  expect(res.length).toBeLessThanOrEqual(20);
});
