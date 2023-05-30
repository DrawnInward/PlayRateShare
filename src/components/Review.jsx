import { useLocation } from "react-router-dom";

const Review = () => {
  const location = useLocation();
  const { review } = location.state;
  console.log;
  console.log(review);
};

export default Review;
