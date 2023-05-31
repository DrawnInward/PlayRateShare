import { getComments } from "../apis";

const Comments = () => {
  const [comments, setComments] = useState(false);
  useEffect(() => {
    getComments().then((comments) => {
      setComments(comments);
    });
  }, [setComments]);

  if (!comments) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="comments">
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </ul>
  );
};

export default Comments;
