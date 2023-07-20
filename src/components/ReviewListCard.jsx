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
        return review;
      })
      .catch((err) => {
        setUpdatedVotes((currentCount) => currentCount - num);
        setErr("We were unable to add your upvote, please try again.");
      });
  };

  return (
    <article className="list-review-card">
      <div className="list-title">
        <h3>{title}</h3>
      </div>
      <div className="list-image-container">
        <Link to={`/reviews/${review_id}`}>
          <img
            className="list-review-image"
            src={review_img_url}
            alt={`provided by ${owner}`}
          />
        </Link>
      </div>
      <p className="list-owner">
        Created by: <br /> {owner}
      </p>
      <p className="list-category">
        Category: <br /> {category}
      </p>
      <div className="list-buttons-container">
        <button
          className="list-votes-button-increment"
          onClick={() => {
            incrementVote(review_id, 1);
          }}
        >
          Up vote
        </button>
        <button
          className="list-votes-button-decrement"
          onClick={() => {
            incrementVote(review_id, -1);
          }}
        >
          Down vote
        </button>
        <button className="list-votes-button">{updatedVotes}</button>
      </div>
      {err && <p className="error-message">{err}</p>}
    </article>
  );
};

export default ReviewListCard;
