import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { getComments, getReviews } from "../apis";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { postComment } from "../apis";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import LoadingSpinner from "./LoadingSpinner";

const Review = () => {
  const { review_id } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [review, setReview] = useState({});
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletedComment, setDeletedComment] = useState({});

  const openModal = () => {
    user && setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (!newComment) {
      return;
    }
    closeModal();
    const temporaryDate = Date.now();
    const commentBody = {
      username: user.username,
      body: newComment,
    };
    const optimisticComment = {
      comment_id: temporaryDate,
      author: user.username,
      body: newComment,
      created_at: temporaryDate,
    };
    setComments((currentComments) => [optimisticComment, ...currentComments]);
    setNewComment("");

    postComment(review_id, commentBody)
      .then((newComment) => {
        setComments((currentComments) =>
          currentComments.map((comment) =>
            comment.created_at === temporaryDate ? newComment : comment
          )
        );
        setError("");
      })
      .catch((err) => {
        setError("There was an error posting your comment, please try again.");
        setComments((currentComments) =>
          currentComments.filter(
            (comment) => comment.created_at !== temporaryDate
          )
        );
      });
  };

  useEffect(() => {
    if (error && deletedComment.comment) {
      setComments((currentComments) => {
        const { comment, index } = deletedComment;
        const updatedComments = [
          ...currentComments.slice(0, index),
          comment,
          ...currentComments.slice(index + 1),
        ];
        return updatedComments;
      });
    }
  }, [error, deletedComment]);

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

  return (
    <>
      {isLoading ? ( // If isLoading is true, display the loading spinner
        <LoadingSpinner key={"spinner"} isLoading={isLoading} />
      ) : (
        // Otherwise, display the content once the data is ready
        <>
          <ReviewCard key={review.review_id} review={review} />
          <div className="comments-scroller">
            <button
              className="add-comment-button"
              onClick={() => {
                openModal();
              }}
            >
              {user ? (
                "Add a comment!"
              ) : (
                <Link to="/login">Sign in to add a comment</Link>
              )}
            </button>
            <Modal
              isOpen={modalIsOpen}
              onClose={closeModal}
              className="comment-modal"
              key={"commentModal"}
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
            </Modal>
            {error && <p>{error}</p>}
            {comments ? (
              <ul className="comments">
                {comments.map((comment) => (
                  <li className="comment-list" key={comment.comment_id}>
                    {deletedComment.comment &&
                      deletedComment.comment.comment_id ===
                        comment.comment_id && (
                        <p key={`error-${comment.comment_id}`}>
                          Your comment could not be deleted, please try again.
                        </p>
                      )}
                    <CommentCard
                      key={comment.comment_id}
                      comment={comment}
                      comments={comments}
                      setComments={setComments}
                      setError={setError}
                      error={error}
                      deletedComment={deletedComment}
                      setDeletedComment={setDeletedComment}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>Be the first to post a comment!</p>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default Review;
