import { useContext, useEffect, useState } from "react";

import upVoteSVG from "../assets/upVote.svg";
import GreyUpVoteSVG from "../assets/upVoteGrey.svg";
import { patchVote, postVote } from "../apis";
import { UserContext } from "../App";

export default function UpVote({
  voteList,
  incrementVote,
  setVoteHasOccured,
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
  }, [voteList, review_id, postVote, patchVote]);

  console.log(filteredVote, "filteredVote");
  console.log(voteList, "votelist");

  useEffect(() => {
    if (filteredVote.length > 0 && filteredVote[0].vote_direction === 1) {
      setIsActive(false);
    } else if (!user) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [filteredVote]);

  const onClick = () => {
    if (user) {
      let newVoteObject = {};
      if (review_id) {
        newVoteObject = {
          username: user.username,
          review_id,
          vote_direction: 1,
        };
      } else {
        newVoteObject = {
          username: user.username,
          comment_id,
          vote_direction: 1,
        };
      }

      if (isActive && filteredVote.length === 0) {
        postVote(newVoteObject).then(() => {
          incrementVote(review_id, 1);
          console.log("posted");
          setVoteHasOccured((currentCounter) => currentCounter + 1);
        });
      } else if (isActive && review_id) {
        incrementVote(review_id, 1);
        patchVote(newVoteObject);
        console.log("patched!!!!");
        setVoteHasOccured((currentCounter) => currentCounter + 1);
      } else if (isActive && comment_id) {
        incrementVote(comment_id);
        patchVote(newVoteObject);
        setVoteHasOccured((currentCounter) => currentCounter + 1);
      }
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
