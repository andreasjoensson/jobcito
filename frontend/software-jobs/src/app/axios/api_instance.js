import axios from "axios";
const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

const instance = axios.create({
  baseURL: apiEndpoint,
});

export default instance;
