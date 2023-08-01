import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const getIPageByRouteUrl = async (routeUrl: string) => {
  const url = API_URL + `getIPageByRouteUrl?routeUrl=${routeUrl}`;
  console.log({ url });
  const response = await axios.get(url);

  const { data } = response;
  console.log({ data });
  return data;
};
