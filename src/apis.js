import axios from "axios";

const api = axios.create({
  baseURL: "https://games-aibr.onrender.com/api",
});

export function getReviews(endpoint, query) {
  return api.get(endpoint, { params: { category: query } }).then(({ data }) => {
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

export function getUsers() {
  return api.get("/users").then(({ data: { users } }) => {
    return users;
  });
}

export function postComment(id, body) {
  return api
    .post(`/reviews/${id}/comments`, body)
    .then(({ data: { comment } }) => {
      return comment;
    });
}

export function getCategories() {
  return api.get("/categories").then(({ data: { categories } }) => {
    return categories;
  });
}

export function removeComment(id) {
  return api.delete(`/comments/${id}`).then(() => {
    console.log("deleted");
  });
}
