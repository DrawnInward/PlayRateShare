import { useEffect, useState } from "react";
import downVoteSVG from "../assets/downVote.svg";
import GreyDownVoteSVG from "../assets/downVoteGrey.svg";


export default function DownVote({voteData}) {
   
    const [isActive, setIsActive ] = useState(true)
    
    useEffect(() => {
        if(voteData.voteDirection === -1) {
            setIsActive(false)
        }
    })

    return (

        <img
        src={isActive ? downVoteSVG : GreyDownVoteSVG}
        className="list-votes-button-increment"
        alt="Up vote"
        onClick={() => {
            incrementVote(review_id, 1);
            {
                /* if voteList  */
            }
        }}
        />
        )
}