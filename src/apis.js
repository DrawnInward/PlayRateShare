import axios from "axios";

const api = axios.create({
  baseURL: "https://games-aibr.onrender.com/api",
});

export function getReviews(endpoint = "/reviews") {
  return api.get(endpoint).then(({ data }) => {
    if (data.reviews) {
      return data.reviews;
    } else {
      return data.review;
    }
  });
}
