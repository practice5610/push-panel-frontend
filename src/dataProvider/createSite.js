import { getHeader } from "./session";

async function createSite(API_URL, params) {
  let site = params.data;
  const response = await fetch(API_URL + "/admin/sites", {
    headers: getHeader(),
    method: "POST",
    body: JSON.stringify(site),
  });

  const responseBody = await response.json();
  site.id = responseBody._id;

  return { data: site };
}

export default createSite;
