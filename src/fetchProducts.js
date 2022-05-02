const FAKE_STORE_API_URL = "https://fakestoreapi.com/products";

function fetchProducts(url = FAKE_STORE_API_URL) {
  return window.fetch(url).then(async (response) => {
    const data = await response.json();
    console.log("data: ", data);
    if (response.ok) {
      if (data) {
        return data;
      } else {
        return Promise.reject(new Error("response failed"));
      }
    } else {
      const error = {
        // message: data?.errors?.map((e) => e.message).join("\n"),
      };
      return Promise.reject(error);
    }
  });
}

export { fetchProducts };
