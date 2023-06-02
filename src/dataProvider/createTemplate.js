import { getHeader } from "./session";

async function createTemplate(API_URL, params) {
  console.log("function gets called", params);
  let template = params.data;
  let url = `${API_URL}/admin/templates`;

  console.log(template);

  const formData = new FormData();

  const obj = {
    title: template.title,
    body: template.body,
    url: template.url,
    icon: template?.icon?.rawFile,
    image: template?.image?.rawFile,
    skipSites: template.skipSites,
  };

  var key;
  for (key in obj) {
    formData.append(key, obj[key]);
  }

  const response = await fetch(API_URL + "/admin/templates", {
    headers: getHeader("multipart/form-data"),
    method: "POST",
    body: formData,
  });

  const responseBody = await response.json();
  console.log(responseBody);

  template.id = responseBody._id;

  return { data: template };
}

export default createTemplate;
