import { Link } from "react-router-dom";

const ReviewListCard = ({ review }) => {
  const {
    review_id,
    title,
    review_img_url,
    owner,
    votes,
    comment_count,
    category,
  } = review;

  return (
    <article className="lreview-card">
      <div className="limage-container">
        <Link to={`/review/${review_id}`}>
          <img
            className="lreview-image"
            src={review_img_url}
            alt={`provided by ${owner}`}
          />
        </Link>
      </div>
      <div className="lcontent-container">
        <h3>{title}</h3>
        <p className="lowner">{owner}</p>
        <p className="lcategory">{category}</p>
      </div>
      <div className="lbuttons-container">
        <button className="lvotes-button">votes:{votes}</button>
        <button className="lcomment-button">comments:{comment_count}</button>
      </div>
    </article>
  );
};

export default ReviewListCard;
