import { getHeader } from "./session";

async function getSites(API_URL, resource, params) {
  //defining the params object
  let requestParams = {};

  //sortings
  if (params.sort.field !== "id") {
    requestParams.sortBy = params.sort.field;
    requestParams.sortingOrder = params.sort.order;
  }

  //searching
  if (params.filter.q) {
    requestParams.q = params.filter.q;
  }

  //pagination
  requestParams = { ...requestParams, ...params.pagination };
  let urlEncodedParams = "";
  var key;
  for (key in requestParams) {
    urlEncodedParams +=
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(requestParams[key]) +
      "&";
  }

  //making the request
  const url = `${API_URL}/admin/sites?${urlEncodedParams}`;
  const serverResponse = await fetch(url, {
    method: "GET",
    headers: getHeader(),
  });
  const resBody = await serverResponse.json();
  if (resBody.err) {
    console.log(resBody);
  }
  console.log(resBody);

  //changing _id to id
  resBody.data = resBody.data.map((value) => {
    let modified = { ...value };
    modified.id = value._id;
    return modified;
  });
  return resBody;
}

export default getSites;
