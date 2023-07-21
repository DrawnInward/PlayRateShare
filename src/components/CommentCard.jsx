import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { removeComment } from "../apis";
import extractDate from "../utils/extractDate";

const CommentCard = ({
  comment: { comment_id, body, author, votes = 0, created_at },
  setComments,
  comments,
  error,
  setError,
  deleteComment,
  setDeletedComment,
}) => {
  const { user } = useContext(UserContext);

  const handleDelete = (id) => {
    const index = comments.findIndex((comment) => comment.comment_id === id);
    console.log(comments[index], "comments[index]");
    setDeletedComment({ comment: comments[index], index: index });
    setComments((currentComments) => {
      const updatedComments = [...currentComments];
      updatedComments.splice(index, 1);
      return updatedComments;
    });
    removeComment(id)
      .then(() => {
        setError("");
      })
      .catch((err) => {
        setError("There was an error deleting your comment, please try again.");
        setTimeout(() => {
          console.log(error, "in catch");
        }, 100);
      });
  };

  return (
    <>
      <article className="comment-card">
        <div className="comment-body-container">
          <h3>{body}</h3>
        </div>
        <div className="comment-content-container">
          <p className="comment-author">{author}</p>
          <p className="comment-created-at">{extractDate(created_at)}</p>
        </div>
        <div className="comment-buttons-container">
          <button className="votes-button">votes:{votes}</button>
        </div>
        {user && user.username === author && (
          <button
            className="delete-button"
            onClick={() => {
              handleDelete(comment_id);
            }}
          >
            Delete
          </button>
        )}
      </article>
    </>
  );
};

export default CommentCard;
