import axios from "axios";

export const productionUrl = "/.netlify/functions/items";

export const customFetch = axios.create({
  baseURL: productionUrl,
});
