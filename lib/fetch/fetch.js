const fetchGET = async (url) => {
  const res = await fetch(url);
  return await res.json();
};
const fetchPOST = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

const fetchPUT = async (url, data) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};
const fetchDELETE = async (url, data) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export { fetchGET, fetchPOST, fetchPUT, fetchDELETE };
