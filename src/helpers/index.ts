import { SearchParams } from "../models";
import { pickBy, identity } from "lodash";

const DEFAULT_LIMIT = 20;

const criterias = [
  {
    title: "Année",
    field: "annee_tournage",
    data: Array(100)
      .fill(new Date().getFullYear() - 1)
      .map((cum, val) => ++cum - val + ""),
  },
  {
    title: "Arrondissement",
    field: "ardt_lieu",
    data: Array(20)
      .fill(75000)
      .map((cum, val) => ++cum + val + ""),
  },
  {
    title: "Type",
    field: "type_tournage",
    data: ["Long métrage", "Série TV", "Téléfilm"],
  },
];

export const normalizeSearchParams = ({
  limit,
  offset,
  options,
}: SearchParams): SearchParams => {
  return {
    limit: limit ?? DEFAULT_LIMIT,
    offset: offset ?? 0,
    options,
  };
};

const orURI = () => " OR ";

const yearURI = (year: string) => {
  const theDate = `date'${year}/01/01'`;
  return `annee_tournage=${theDate}`;
};

export const anneeTournageURI = (years: string[]) => {
  let result = yearURI(years[0]);
  for (let i = 1; i < years.length; i++) {
    result += `${orURI()}${yearURI(years[i])}`;
  }
  return years.length > 1 ? `(${result})` : result; // Add () to have the prevalence of OR operator over AND one
};

export const otherTextURI = (texts: string[], optionTitle: string) => {
  const criteria = criterias.filter((c: any) => c.title === optionTitle)[0]
    .field;
  let result = `${criteria}='${texts[0]}'`;
  for (let i = 1; i < texts.length; i++) {
    result += `${orURI()}${criteria}=${texts[i]}`;
  }
  return texts.length > 1 ? `(${result})` : result; // Add () to have the prevalence of OR operator over AND one
};
