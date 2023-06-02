export function getHeader(contentType) {
  let header = {};
  header.id = localStorage.getItem("id");
  header.key = localStorage.getItem("key");
  if (!header.id || !header.key) {
    return;
  }
  let theHeader = new Headers();

  for (var k in header) {
    theHeader.append(k, header[k]);
  }

  if (!contentType) {
    theHeader.append("Content-Type", "application/json");
  }
  //} else {
  //theHeader.append("Content-Type", contentType);
  //console.log("idiot", theHeader);
  //}

  return theHeader;
}

export function setHeader(header) {
  localStorage.setItem("id", header.id);
  localStorage.setItem("key", header.key);
}

export function deleteHeader() {
  localStorage.clear();
  return;
}
