import axios from "axios";

export const api = axios.create({
  baseURL: "https://football-quiz.onrender.com/api/v1/",
});
