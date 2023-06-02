import { useState, useEffect } from "react";
import { getComments, getReviews } from "../apis";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";

const Review = () => {
  const { review_id } = useParams();

  const [review, setReview] = useState({});
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(review_id).then((comments) => {
      setComments(comments);
    });
  }, []);

  useEffect(() => {
    getReviews(`/reviews/${review_id}`).then((reviewFromApi) => {
      setReview(reviewFromApi);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <ReviewCard key={review.review_id} review={review} />
      <div className="comments-scroller">
        {comments ? (
          <ul className="comments">
            {comments.map((comment) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))}
          </ul>
        ) : (
          <p>Be the first to post a comment!</p>
        )}
      </div>
    </>
  );
};

export default Review;
