import axios from "axios";

const api = axios.create({
  baseURL: "https://games-aibr.onrender.com/api",
});

export function getReviews(item = "/reviews") {
  return api.get(item).then(({ data: { reviews } }) => {
    if (reviews) {
      return reviews;
    }
  });
}

export function getComments(id) {
  return api.get(`/reviews/${id}/comments`).then(({ data: { comments } }) => {
    if (comments) {
      return comments;
    }
  });
}
