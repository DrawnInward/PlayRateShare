import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getReviews } from "../apis";
import ReviewCard from "./ReviewCard";

const Review = () => {
  const location = useLocation();

  const { review_id } = location.state;

  const [review, setReview] = useState(false);
  console.log(review_id);
  useEffect(() => {
    getReviews(`/reviews/${review_id}`).then((reviewFromApi) => {
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
