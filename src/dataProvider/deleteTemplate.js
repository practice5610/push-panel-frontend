import { getHeader } from "./session";

async function deleteTemplate(API_URL, params) {
  const response = await fetch(`${API_URL}/admin/templates/${params.id}`, {
    method: "DELETE",
    headers: getHeader(),
  });
  await response.json();
  return { data: [] };
}

export default deleteTemplate;
