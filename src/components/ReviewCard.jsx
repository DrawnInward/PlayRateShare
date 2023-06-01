import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

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
        <>
          {comment_count > 0 ? (
            <Link
              to={`/reviews/${review_id}/comments`}
              state={{ body: review_body }}
            >
              <button className="comment-button">
                comments:{comment_count}
              </button>
            </Link>
          ) : (
            <button className="comment-button">comments:{comment_count}</button>
          )}
        </>
      </div>
      <div className="display-comments-box"></div>
    </article>
  );
};

export default ReviewCard;
