import { useEffect, useState, useContext } from "react";
import { getReviews } from "../apis";
import ReviewListCard from "./ReviewListCard.jsx";
import { useSearchParams } from "react-router-dom";

const Reviews = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");

  useEffect(() => {
    getReviews("/reviews", categoryQuery).then((reviewsFromApi) => {
      setReviewList(reviewsFromApi);
      setIsLoading(false);
    });
  }, [categoryQuery]);

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
