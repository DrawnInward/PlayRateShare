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

export function patchVotes(id, obj) {
  return api.patch(`/reviews/${id}`, obj).then(({ data }) => {
    return data.reviews;
  });
}

export function getComments(id) {
  return api.get(`/reviews/${id}/comments`).then(({ data: { comments } }) => {
    if (comments) {
      return comments;
    }
  });
}
