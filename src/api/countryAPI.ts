import api from "./api";

export const countryAPI = {
    fetchCountry: () => api.get("/all"),
    search: (name: string) => api.get(`/name/${name}`),
}