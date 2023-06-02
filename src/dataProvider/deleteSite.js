import { getHeader } from "./session";

async function deleteSite(API_URL, params) {
  const response = await fetch(`${API_URL}/admin/sites/${params.id}`, {
    method: "DELETE",
    headers: getHeader(),
  });
  await response.json();
  return { data: [] };
}

export default deleteSite;
