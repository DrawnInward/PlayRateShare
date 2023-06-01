import { useEffect, useState, useContext } from "react";
import { getReviews } from "../apis";
import ReviewListCard from "./ReviewListCard.jsx";

const Reviews = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews().then((reviewsFromApi) => {
      setReviewList(reviewsFromApi);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return "...Loading";
  }

  return (
    <ul className="reviewsList">
      {reviewList.map((review) => {
        return <ReviewListCard key={review.review_id} review={review} />;
      })}
    </ul>
  );
};

export default Reviews;
