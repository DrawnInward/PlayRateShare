import { useState, useEffect } from "react";
import { getReviews } from "../apis";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";

const Review = () => {
  const { reviewId } = useParams();

  const [review, setReview] = useState(false);
  console.log(reviewId);
  useEffect(() => {
    getReviews(`/reviews/${reviewId}`).then((reviewFromApi) => {
      setReview(reviewFromApi);
    });
  }, []);

  console.log(review);

  if (!review) {
    return "Loading...";
  }

  return <ReviewCard key={review.review_id} review={review} />;
};

export default Review;
