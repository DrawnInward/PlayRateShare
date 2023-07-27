import axios from "axios";

const api = axios.create({
  baseURL: "https://games-aibr.onrender.com/api",
});

export function getReviews(endpoint, query) {
  return api.get(endpoint, query).then(({ data }) => {
    if (data.reviews) {
      return data.reviews;
    } else {
      return data.review;
    }
  });
}

export function patchVotes(id, obj, column) {
  return api.patch(`/${column}/${id}`, obj).then(({ data }) => {
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

export function getSingleUser(username) {
  return api.get(`/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
}

export function postUser(body) {
  return api.post("/users", body).then(({ data: { user } }) => {
    return user;
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
export function authenticateUser(object) {
  return api
    .post("/users/authentication", object)
    .then(({ data }) => {
      return data.user;
    })
    .catch((error) => {
      throw error;
    });
}

export function getVotes(username) {
  return api.get(`/votes/${username}`).then(({ data }) => {
    console.log(data.votes, "votes");
    return data.votes;
  });
}

export function postVote(body) {
  return api.post("/votes", body).then(({ data }) => {
    return data.votes;
  });
}

export function patchVote(body) {
  return api.patch("/votes", body).then(({ data }) => {
    return data.votes;
  });
}
