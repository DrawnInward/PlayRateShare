import { useEffect, useState, useContext } from "react";
import { getReviews } from "../apis";
import ReviewCard from "./ReviewCard.jsx";

const Reviews = () => {
  const [reviewList, setReviewList] = useState(false);

  useEffect(() => {
    getReviews().then((reviewsFromApi) => {
      setReviewList(reviewsFromApi);
    });
  }, []);

  if (!reviewList) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="reviewsList">
      {reviewList.map((review) => {
        return <ReviewCard key={review.review_id} review={review} />;
      })}
    </ul>
  );
};

export default Reviews;
