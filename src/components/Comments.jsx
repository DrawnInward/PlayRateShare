import { getComments } from "../apis";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

const Comments = () => {
  const [comments, setComments] = useState(false);
  const { review_id } = useParams();
  const location = useLocation();
  const body = location.state.body;
  console.log(body);
  console.log(review_id);

  useEffect(() => {
    getComments(review_id).then((comments) => {
      setComments(comments);
    });
  }, [setComments]);

  console.log(comments);

  if (!comments) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>{body}</h2>
      <ul className="comments">
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </ul>
    </>
  );
};

export default Comments;
