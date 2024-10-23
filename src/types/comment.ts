export interface IComment {
    _id: string;
    eventId: string;
    username: string;
    comment: string;
    likes: string[];
    createdAt: string;
    name: string;
    profilePicture: string;
    replyingTo: string;
}