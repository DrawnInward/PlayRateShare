import { Link } from "react-router-dom";
import { patchVotes } from "../apis";
import { useState } from "react";

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

  const [updatedVotes, setUpdatedVotes] = useState(votes);
  const [err, setErr] = useState(null);

  const incrementVote = (id, num) => {
    setUpdatedVotes((currentCount) => currentCount + num);
    setErr(null);
    patchVotes(id, { inc_votes: num })
      .then((review) => {
        console.log(review);
        return review;
      })
      .catch((err) => {
        setUpdatedVotes((currentCount) => currentCount - num);
        setErr("We were unable to add your upvote, please try again.");
      });
  };

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
        <button
          className="lvotes-button-increment"
          onClick={() => {
            incrementVote(review_id, 1);
          }}
        >
          Up vote
        </button>
        <button
          className="lvotes-button-decrement"
          onClick={() => {
            incrementVote(review_id, -1);
          }}
        >
          Down vote
        </button>
        <button className="lvotes-button">{updatedVotes}</button>
      </div>
      {err && <p className="error-message">{err}</p>}
    </article>
  );
};

export default ReviewListCard;
