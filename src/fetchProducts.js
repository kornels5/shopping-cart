const FAKE_STORE_API_URL = "https://fakestoreapi.com/products";

function fetchProducts(id = "") {
  return window.fetch(`${FAKE_STORE_API_URL}/${id}`).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      if (data) {
        return data;
      } else {
        return Promise.reject(new Error("no data"));
      }
    } else {
      return Promise.reject(new Error("response failed"));
    }
  });
}

export { fetchProducts };
