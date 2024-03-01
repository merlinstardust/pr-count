import { NextRequest } from "next/server";

type SearchParamsObject = {
  [key: string]: string
}

export default function getSearchParamsAsObject(searchParams: URLSearchParams) {
  const searchParamsObject: SearchParamsObject = {};
  searchParams.forEach((value, key) => searchParamsObject[key] = value);
  return searchParamsObject;
}
