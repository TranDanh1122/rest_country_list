import api from "./api";

export const countryAPI = {
    fetchCountry: () => api.get("./data.json"),
    // search: (name: string) => api.get(`/name/${name}`),
}