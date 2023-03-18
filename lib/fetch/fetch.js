const fetchGET = async (url) => {
  const res = await fetch(url);
  return await res.json();
};
const fetchPOST = async (url, dataObj) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dataObj),
  });
  return await res.json();
};

const fetchPUT = async (url, dataObj) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dataObj),
  });
  return await res.json();
};

export { fetchGET, fetchPOST, fetchPUT };
