class FollowersModel{
    public userId: string;
    public vacationId: string;

    constructor(followers: FollowersModel){
        this.userId = followers.userId;
        this.vacationId = followers.vacationId
    }
}

export default FollowersModel;