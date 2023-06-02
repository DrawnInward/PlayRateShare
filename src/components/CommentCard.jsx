const CommentCard = ({ comment: { body, author, votes = 0, created_at } }) => {
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
    </article>
  );
};

export default CommentCard;
