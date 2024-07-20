import axios from "axios";

export const ApiBD = axios.create({
    baseURL: "http://localhost:3333"
});

