const ReviewCard = ({
  review: {
    review_id,
    title,
    review_img_url,
    owner,
    votes,
    comment_count,
    category,
  },
}) => {
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
      </div>
      <div className="buttons-container">
        <button className="votes-button">votes:{votes}</button>
        <button className="comment-button">comments:{comment_count}</button>
      </div>
    </article>
  );
};

export default ReviewCard;
