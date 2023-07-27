import { Link } from "react-router-dom";
import { getVotes, patchVotes } from "../apis";
import { useContext, useEffect, useState } from "react";
import toTitleCase from "../utils/toTitleCase";
import { UserContext } from "../App";
import downVoteSVG from "../assets/downVote.svg";
import upVoteSVG from "../assets/upVote.svg";
import UpVote from "./UpVote";

const ReviewListCard = ({ review, voteList, setVoteList }) => {
  const {
    review_id,
    title,
    review_img_url,
    owner,
    votes,
    comment_count,
    category,
  } = review;

  const { user } = useContext(UserContext);

  const [updatedVotes, setUpdatedVotes] = useState(votes);
  const [err, setErr] = useState(null);

  const [voteData, setVoteData] = useState({});

  const incrementVote = (id, num) => {
    setUpdatedVotes((currentCount) => currentCount + num);
    setErr(null);
    patchVotes(id, { inc_votes: num }, "reviews")
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
        Category: <br /> {toTitleCase(category)}
      </p>

      <div className="list-buttons-container">
        <UpVote
          voteList={voteList}
          incrementVote={incrementVote}
          review_id={review_id}
        />
        <button className="list-votes-counter">{updatedVotes}</button>
        <img
          src={downVoteSVG}
          className="list-votes-button-decrement"
          alt="Down vote"
          onClick={() => {
            incrementVote(review_id, -1);
          }}
        />
      </div>
      {err && <p className="error-message">{err}</p>}
    </article>
  );
};

export default ReviewListCard;
