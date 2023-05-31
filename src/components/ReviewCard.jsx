const ReviewCard = ({ review }) => {
  const {
    review_id,
    title,
    review_img_url,
    owner,
    votes,
    comment_count,
    category,
    game_designer,
    review_body,
    created_at,
  } = review;

  return (
    <article className="review-card">
      <div className="image-container">
        <img
          className="review-image"
          src={review_img_url}
          alt={`provided by ${owner}`}
        />
      </div>
      <div className="content-container">
        <h3>{title}</h3>
        <p className="owner">{owner}</p>
        <p className="category">{category}</p>
        <p className="designer">{game_designer}</p>
        <p className="created">{created_at}</p>
      </div>
      <div className="body-container">
        <p>{review_body}</p>
      </div>

      <div className="buttons-container">
        <button className="votes-button">votes:{votes}</button>
        <button className="comment-button">comments:{comment_count}</button>
      </div>
    </article>
  );
};

export default ReviewCard;