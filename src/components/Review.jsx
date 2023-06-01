import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { getComments, getReviews } from "../apis";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { postComment } from "../apis";

import Modal from "./Modal";

const Review = () => {
  const { review_id } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [review, setReview] = useState({});
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    user && setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const commentBody = {
      username: user.username,
      body: newComment,
    };
    postComment(review_id, commentBody).then((comment) => {});
  };

  useEffect(() => {
    getComments(review_id).then((comments) => {
      setComments(comments);
    });
  }, [setComments]);

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
        <button
          className="add-comment-button"
          onClick={() => {
            openModal();
          }}
        >
          {user ? "Add a comment!" : "Sign in to add a comment"}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
          className="comment-modal"
        >
          <h2>Add Comment</h2>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              rows="4"
              cols="50"
              placeholder="Enter your comment"
              value={newComment}
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
          <button>Submit</button>
        </Modal>
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
