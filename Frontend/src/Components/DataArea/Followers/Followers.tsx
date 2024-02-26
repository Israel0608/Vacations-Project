import React, { useState, useEffect } from 'react';
import dataService from "../../../Services/DataService";
import "./Followers.css";
import { vacationsStore } from '../../../Redux/VacationState';

interface FollowersProps {
    vacationId: string;
    userId: string;
    isFollow: number;
    followersCount: number;
}

function Followers(props: FollowersProps): JSX.Element {
    const [followerCount, setFollowerCount] = useState(props.followersCount);
    const follow = props.isFollow === 1 ? true : false;
    const [isFollowing, setIsFollowing] = useState(follow);

    function handleLike() {
        if (!isFollowing) {
            dataService.followe(props.userId, props.vacationId)
                .then(() => {
                    setFollowerCount(prevCount => prevCount + 1);
                    setIsFollowing(true);
                })
                .catch(error => console.error('Error liking vacation:', error));
        } else {
            dataService.unFollowe(props.userId, props.vacationId)
                .then(() => {
                    setFollowerCount(prevCount => prevCount - 1);
                    setIsFollowing(false);
                })
                .catch(error => console.error('Error unliking vacation:', error));
        }
    };


    return (
        <div>
            <button onClick={handleLike} style={{ color: isFollowing ? 'blue' : 'black' }} >
                {isFollowing ? 'Unlike' : 'Like'} 👍🏻
            </button>
            <span>{followerCount} {followerCount === 1 ? 'person' : 'people'}</span>
        </div>
    );
}

export default Followers;