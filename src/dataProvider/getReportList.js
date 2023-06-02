import { getHeader } from "./session";

async function getReports(API_URL, resource, params) {
  console.log(params);
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
  const url = `${API_URL}/admin/notifications?${urlEncodedParams}`;
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
    modified.messageDetails = `Title: ${value.title} \n 
    Body: ${value.body}`;
    if (modified.clicked === 0) {
      modified.clicked = `${modified.clicked} (0%)`;
    } else {
      modified.clicked = `${modified.clicked} (${(
        (value.clicked / value.impressions) *
        100
      ).toFixed(2)}%)`;
    }
    return modified;
  });
  return resBody;
}

export default getReports;
