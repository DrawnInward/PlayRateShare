import { useEffect, useState, useContext } from "react";
import { getReviews } from "../apis";
import ReviewListCard from "./ReviewListCard.jsx";
import { Link, useSearchParams } from "react-router-dom";

const Reviews = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  const queryObj = {
    params: {
      category: categoryQuery,
      sort_by: sortByQuery,
      order: orderQuery,
    },
  };

  const setSortOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const handleDropdownClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSortByClick = (sortBy) => {
    queryObj.params.sort_by = sortBy;
  };

  useEffect(() => {
    getReviews("/reviews", queryObj).then((reviewsFromApi) => {
      setReviewList(reviewsFromApi);
      setIsLoading(false);
    });
  }, [categoryQuery, sortByQuery, orderQuery]);

  if (isLoading) {
    return "...Loading";
  }

  return (
    <>
      <div className="sorting-buttons">
        <div className="dropdown">
          <button className="dropbtn" onClick={handleDropdownClick}>
            Sort By
          </button>
          {isOpen && (
            <div className="dropdown-content">
              <ul>
                <li>
                  <Link
                    onClick={handleDropdownClick}
                    to="/reviews?sort_by=created_at"
                  >
                    Date
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleDropdownClick}
                    to="/reviews?sort_by=comment_count"
                  >
                    Comment Count
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleDropdownClick}
                    to="/reviews?sort_by=votes"
                  >
                    Votes
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleDropdownClick}
                    to="/reviews?sort_by=designer"
                  >
                    Designer
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleDropdownClick}
                    to="/reviews?sort_by=owner"
                  >
                    Review Author
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleDropdownClick}
                    to="/reviews?sort_by=category"
                  >
                    Category
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button onClick={() => setSortOrder("asc")}>Ascending</button>
        <button onClick={() => setSortOrder("desc")}>Descending</button>
      </div>
      <ul className="reviewsList">
        {reviewList.map((review) => {
          return <ReviewListCard key={review.review_id} review={review} />;
        })}
      </ul>
    </>
  );
};

export default Reviews;
