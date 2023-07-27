import { useContext, useEffect, useState } from "react";

import upVoteSVG from "../assets/upVote.svg";
import GreyUpVoteSVG from "../assets/upVoteGrey.svg";
import { postVote } from "../apis";
import { UserContext } from "../App";
import LoadingSpinner from "./LoadingSpinner";

export default function UpVote({
  voteList,
  incrementVote,
  review_id,
  comment_id,
}) {
  const [isActive, setIsActive] = useState(true);
  const [filteredVote, setFilteredVote] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (voteList) {
      setFilteredVote(voteList.filter((vote) => vote.review_id === review_id));
    }
  }, [voteList, review_id]);

  useEffect(() => {
    if (filteredVote.length > 0 && filteredVote[0].vote_direction === 1) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [filteredVote]);

  const onClick = () => {
    if (!filteredVote.username) {
      let newVoteObject = {};
      if (review_id) {
        newVoteObject = {
          username: user.username,
          review_id,
          vote_direction: 1,
        };
        setIsActive(false);
      } else {
        newVoteObject = {
          username: user.username,
          comment_id,
          vote_direction: 1,
        };
        setIsActive(false);
      }
      postVote(newVoteObject).then(() => {
        console.log("posted");
      });
    } else if (voteData.username) {
      setIsActive(false);
    }
    if (isActive && review_id) {
      incrementVote(review_id, 1);
      setIsActive(false);
    }
    if (isActive && comment_id) {
      incrementVote(comment_id);
    }
  };

  return (
    <>
      <img
        src={isActive ? upVoteSVG : GreyUpVoteSVG}
        className="list-votes-button-increment"
        alt="Up vote"
        onClick={onClick}
      />
    </>
  );
}
