import { useContext } from "react";
import { UserContext } from "../App";
import { deleteComment } from "../apis";

const CommentCard = ({
  comment: { comment_id, body, author, votes = 0, created_at },
}) => {
  const { user } = useContext(UserContext);

  const handleDelete = (id) => {
    deleteComment(id);
  };

  return (
    <article className="comment-card">
      <div className="comment-body-container">
        <h3>{body}</h3>
      </div>
      <div className="comment-content-container">
        <p className="comment-author">{author}</p>
        <p className="comment-created-at">{created_at}</p>
      </div>
      <div className="buttons-container">
        <button className="votes-button">votes:{votes}</button>
      </div>
      {user.username === author && (
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
  );
};

export default CommentCard;
