import { getComments } from "../apis";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(comments);

  const { review_id } = useParams();
  const location = useLocation();
  const body = location.state.body;

  useEffect(() => {
    getComments(review_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>{body}</h2>
      <ul className="comments">
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Comments;
