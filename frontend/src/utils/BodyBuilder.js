
export default function BodyBuilder({query, limit}) {
  let body = {
    "searchRequestDtoList": [
      {
        "column": "type",
        "value": query?.type
      }
    ],
    "sortColumn": query?.sort === undefined ? "sold" : query?.sort === "news" ? "insertedTime" : query?.sort,
    "sortDirection": query?.dir === undefined ? "ASC" : query?.dir,
    "page": query?.page ? query?.page : 1,
    "limit": limit
  };

  if (query?.producer !== null && query?.producer !== undefined) {
    body.searchRequestDtoList.push({
      "column": "producer",
      "value": query?.producer
    });
  }

  if (query?.ram !== null && query?.ram !== undefined) {
    body.searchRequestDtoList.push({
      "column": "ram",
      "value": query?.ram
    });
  }

  if (query?.maxPrice !== null && query?.minPrice !== null && query?.minPrice !== undefined && query?.maxPrice !== undefined) {
    body.searchRequestDtoList.push({
      "column": "price",
      "value": `${query?.minPrice},${query?.maxPrice}`
    });
  } else if (query?.minPrice !== null && query?.maxPrice === null && query?.minPrice !== undefined) {
    body.searchRequestDtoList.push({
      "column": "price",
      "value": `${query?.minPrice}`
    });
  } else if (query?.minPrice === null && query?.maxPrice !== null && query?.maxPrice !== undefined) {
    body.searchRequestDtoList.push({
      "column": "price",
      "value": `${query?.maxPrice}`
    });
  }

  if (query?.cpu !== null && query?.cpu !== undefined) {
    body.searchRequestDtoList.push({
      "column": "cpuType",
      "value": query?.cpu.replace("-", " ")
    });
  }

  if (query?.display !== null && query?.display !== undefined) {
    body.searchRequestDtoList.push({
      "column": "screenSize",
      "value": query?.display.replace("-", " ")
    });
  }

  if (query?.connect !== null && query?.connect !== undefined) {
    body.searchRequestDtoList.push({
      "column": "mouseConnectType",
      "value": query?.connect
    });
  }

  if (query?.sale !== null && query?.sale !== undefined) {
    body.searchRequestDtoList.push({
      "column": "discount",
      "value": query?.sale
    });
  }

  return body;
}
