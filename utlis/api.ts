import axios from 'axios';

export const API = axios.create({
  baseURL:
    'https://football-quiz.onrender.com/api/v1',
});
