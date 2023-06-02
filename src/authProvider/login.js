async function login(API_URL, { username, password }) {
  const request = new Request(API_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  let sersverResponse = await fetch(request);
  if (sersverResponse.status < 200 || sersverResponse.status >= 300) {
    return Promise.reject(Error(sersverResponse.statusText));
  }
  let body = await sersverResponse.json();

  console.log("the server responded with:", body);

  if (body.err) {
    return Promise.reject();
  }

  localStorage.setItem("id", body.id);
  localStorage.setItem("key", body.key);
  localStorage.setItem("privillage", "admin");

  return Promise.resolve();
}

export default login;
